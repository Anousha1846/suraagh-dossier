'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';
import { redirect } from 'next/navigation';

type CheckoutInput = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'cod' | 'online_transfer';
  items: { id: string; quantity: number }[];
};

export async function placeOrder(input: CheckoutInput) {
  const { fullName, phone, address, city, paymentMethod, items } = input;

  if (!items.length) {
    throw new Error('Cart is empty');
  }

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
  const shippingCost = 0;
  const total = subtotal + shippingCost;

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

  const orderNumber = `SD-${Date.now().toString().slice(-6)}`;

  // payment_status differs by method: COD has nothing paid yet, online transfer is awaiting proof
  const paymentStatus = paymentMethod === 'cod' ? 'unpaid' : 'pending_verification';

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
      payment_method: paymentMethod,
      payment_status: paymentStatus,
      subtotal,
      shipping_cost: shippingCost,
      total,
    })
    .select('id, order_number')
    .single();

  if (orderError || !order) {
    throw new Error('Failed to create order');
  }

  const { error: itemsError } = await supabaseAdmin
    .from('order_items')
    .insert(orderItemsData.map((item) => ({ ...item, order_id: order.id })));

  if (itemsError) {
    throw new Error('Failed to save order items');
  }

  const { error: paymentError } = await supabaseAdmin.from('payments').insert({
    order_id: order.id,
    method: paymentMethod,
    amount: total,
    status: 'pending',
  });

  if (paymentError) {
    throw new Error('Failed to create payment record');
  }

  redirect(`/order-confirmation/${order.order_number}`);
}