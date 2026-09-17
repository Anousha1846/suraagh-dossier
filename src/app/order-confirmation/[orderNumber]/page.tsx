import { supabaseAdmin } from '@/lib/supabase/admin';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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

  const whatsappNumber = '923001234567';
  const waMessage = `Hi, I've sent payment for order ${order.order_number} — Rs. ${order.total}. Here's my proof:`;
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="bg-obsidian min-h-screen px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-xs tracking-widest text-bronze mb-4">CASE FILE — SEALED</p>
        <h1 className="font-display text-4xl text-ivory mb-2">Order Confirmed</h1>
        <p className="font-mono text-amber mb-8">{order.order_number}</p>

        <div className="bg-case-paper border border-bronze rounded-sm p-6 mb-6">
          <p className="font-mono text-xs tracking-widest text-bronze mb-4">ITEMS</p>
          {order.order_items.map((item: any) => (
            <p key={item.id} className="font-sans text-ink text-sm mb-1">
              {item.product_name} × {item.quantity} — Rs. {item.line_total}
            </p>
          ))}
          <p className="font-display text-xl text-ink mt-4 pt-4 border-t border-bronze/30">
            Total: Rs. {order.total}
          </p>
        </div>

        <div className="bg-charcoal border border-bronze rounded-sm p-6 mb-6">
          <p className="font-mono text-xs tracking-widest text-bronze mb-4">DELIVERY DETAILS</p>
          <p className="font-sans text-ivory">{order.customer_name}</p>
          <p className="font-sans text-aged-gray text-sm">{order.shipping_phone}</p>
          <p className="font-sans text-aged-gray text-sm">{order.shipping_address}, {order.shipping_city}</p>
        </div>

        {order.payment_method === 'online_transfer' ? (
          <div className="bg-charcoal border border-amber rounded-sm p-6">
            <p className="font-mono text-xs tracking-widest text-amber mb-4">COMPLETE YOUR PAYMENT</p>
            <div className="font-sans text-ivory text-sm space-y-1 mb-4">
              <p>Bank: [Placeholder Bank Name]</p>
              <p>Account Title: [Placeholder Account Title]</p>
              <p>Account Number: [Placeholder Account Number]</p>
              <p className="text-amber mt-2">Please transfer Rs. {order.total} and send proof via WhatsApp.</p>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-burnt-orange hover:bg-amber text-ivory font-sans font-semibold px-6 py-3 rounded-sm transition-colors"
            >
              Send Payment Proof on WhatsApp
            </a>
          </div>
        ) : (
          <p className="font-sans text-aged-gray text-sm">
            We'll contact you on WhatsApp to confirm your order before it ships.
          </p>
        )}

        <Link href="/" className="inline-block mt-8 font-sans text-sm text-bronze hover:text-amber transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}