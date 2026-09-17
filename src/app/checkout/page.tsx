'use client';

import { useCartStore } from '@/lib/cart/store';
import { useState, useRef } from 'react';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { placeOrder } from './actions';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online_transfer'>('cod');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const hasSubmittedRef = useRef(false);

  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  async function handlePlaceOrder() {
    if (hasSubmittedRef.current) return;

    if (!fullName || !phone || !address || !city) {
      setErrorMsg('Please fill in all your details.');
      return;
    }

    hasSubmittedRef.current = true;
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await placeOrder({
        fullName,
        phone,
        address,
        city,
        paymentMethod,
        items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
      });
      clearCart();
    } catch (err) {
      if (isRedirectError(err)) {
        throw err; // let Next.js handle the redirect, this isn't a real failure
      }
      setErrorMsg('Something went wrong placing your order. Please try again.');
      setIsSubmitting(false);
      hasSubmittedRef.current = false;
    }
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
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <input type="tel" placeholder="Phone / WhatsApp number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />

        <h2>Payment Method</h2>
        <label>
          <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
          Cash on Delivery
        </label>
        <label>
          <input type="radio" name="payment" checked={paymentMethod === 'online_transfer'} onChange={() => setPaymentMethod('online_transfer')} />
          Online Bank Transfer
        </label>

        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

        <button type="button" onClick={handlePlaceOrder} disabled={isSubmitting}>
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}