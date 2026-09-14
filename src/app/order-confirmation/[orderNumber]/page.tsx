import { supabaseAdmin } from '@/lib/supabase/admin';
import { notFound } from 'next/navigation';

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .select('*, order_items(*)')
    .eq('order_number', orderNumber)
    .single();

  if (error || !order) notFound();

  return (
    <div>
      <h1>Order Confirmed</h1>
      <p>Order Number: {order.order_number}</p>
      <p>Status: {order.status}</p>

      <h2>Items</h2>
      {order.order_items.map((item: any) => (
        <p key={item.id}>
          {item.product_name} × {item.quantity} — Rs. {item.line_total}
        </p>
      ))}

      <p>Total: Rs. {order.total}</p>

      <h2>Delivery Details</h2>
      <p>{order.customer_name}</p>
      <p>{order.shipping_phone}</p>
      <p>{order.shipping_address}, {order.shipping_city}</p>

      <p>We'll contact you on WhatsApp to confirm your order before it ships.</p>
    </div>
  );
}