'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';
import { redirect } from 'next/navigation';

type CheckoutInput = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  items: { id: string; quantity: number }[];
};

export async function placeCodOrder(input: CheckoutInput) {
  const { fullName, phone, address, city, items } = input;

  if (!items.length) {
    throw new Error('Cart is empty');
  }

  // 1. Re-fetch real prices server-side not trusting client-sent prices
  const productIds = items.map((i) => i.id);
  const { data: products, error: productsError } = await supabaseAdmin
    .from('products')
    .select('id, name, price')
    .in('id', productIds);

  if (productsError || !products || products.length !== productIds.length) {
    throw new Error('One or more products could not be found');
  }

  const orderItemsData = items.map((item) => {
    const product = products.find((p) => p.id === item.id)!;
    return {
      product_id: product.id,
      product_name: product.name,
      unit_price: product.price,
      quantity: item.quantity,
      line_total: product.price * item.quantity,
    };
  });

  const subtotal = orderItemsData.reduce((sum, i) => sum + i.line_total, 0);
  const shippingCost = 0; // PostEx not integrated yet
  const total = subtotal + shippingCost;

  // 2. Customer lookup-or-create by phone
  const { data: existingCustomer } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('phone', phone)
    .maybeSingle();

  let customerId = existingCustomer?.id;

  if (!customerId) {
    const { data: newCustomer, error: customerError } = await supabaseAdmin
      .from('customers')
      .insert({ full_name: fullName, phone })
      .select('id')
      .single();

    if (customerError || !newCustomer) {
      throw new Error('Failed to create customer record');
    }
    customerId = newCustomer.id;
  }

  // 3. Generate order number
  const orderNumber = `SD-${Date.now().toString().slice(-6)}`;

  // 4. Insert order
  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .insert({
      order_number: orderNumber,
      customer_id: customerId,
      customer_name: fullName,
      shipping_phone: phone,
      shipping_address: address,
      shipping_city: city,
      status: 'pending_verification',
      payment_method: 'cod',
      payment_status: 'unpaid',
      subtotal,
      shipping_cost: shippingCost,
      total,
    })
    .select('id, order_number')
    .single();

  if (orderError || !order) {
    throw new Error('Failed to create order');
  }

  // 5. Insert order_items
  const { error: itemsError } = await supabaseAdmin
    .from('order_items')
    .insert(orderItemsData.map((item) => ({ ...item, order_id: order.id })));

  if (itemsError) {
    throw new Error('Failed to save order items');
  }

  // 6. Insert payment record
  const { error: paymentError } = await supabaseAdmin.from('payments').insert({
    order_id: order.id,
    method: 'cod',
    amount: total,
    status: 'pending',
  });

  if (paymentError) {
    throw new Error('Failed to create payment record');
  }

  // 7. Redirect to confirmation
  redirect(`/order-confirmation/${order.order_number}`);
}