'use client';

import { useCartStore } from '@/lib/cart/store';
import { useState } from 'react';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online_transfer'>('cod');

  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h1>Checkout</h1>

      <h2>Order Summary</h2>
      {items.map((item) => (
        <p key={item.id}>{item.name} × {item.quantity} — Rs. {item.price * item.quantity}</p>
      ))}
      <p>Total: Rs. {total}</p>

      <h2>Your Details</h2>
      <form>
        <input type="text" placeholder="Full name" required />
        <input type="tel" placeholder="Phone / WhatsApp number" required />
        <input type="text" placeholder="Address" required />
        <input type="text" placeholder="City" required />

        <h2>Payment Method</h2>
        <label>
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === 'cod'}
            onChange={() => setPaymentMethod('cod')}
          />
          Cash on Delivery
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === 'online_transfer'}
            onChange={() => setPaymentMethod('online_transfer')}
          />
          Online Bank Transfer
        </label>

        <button type="button">Place Order</button>
      </form>
    </div>
  );
}