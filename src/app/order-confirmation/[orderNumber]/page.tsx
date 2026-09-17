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

  const whatsappNumber = '923001234567'; // placeholder — your business WhatsApp number
  const waMessage = `Hi, I've sent payment for order ${order.order_number} — Rs. ${order.total}. Here's my proof:`;
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

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

      {order.payment_method === 'online_transfer' && (
        <div>
          <h2>Complete Your Payment</h2>
          <p>Bank: [Placeholder Bank Name]</p>
          <p>Account Title: [Placeholder Account Title]</p>
          <p>Account Number: [Placeholder Account Number]</p>
          <p>Please transfer Rs. {order.total} and send proof via WhatsApp.</p>
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            Send Payment Proof on WhatsApp
          </a>
        </div>
      )}

      {order.payment_method === 'cod' && (
        <p>We'll contact you on WhatsApp to confirm your order before it ships.</p>
      )}
    </div>
  );
}