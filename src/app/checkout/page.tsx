'use client';

import { useCartStore } from '@/lib/cart/store';
import { useState, useRef } from 'react';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { placeOrder } from './actions';
import Link from 'next/link';

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
    return <p className="bg-ivory min-h-screen px-6 py-16 font-sans text-ink">Your cart is empty.</p>;
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
        fullName, phone, address, city, paymentMethod,
        items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
      });
      clearCart();
    } catch (err) {
      if (isRedirectError(err)) throw err;
      setErrorMsg('Something went wrong placing your order. Please try again.');
      setIsSubmitting(false);
      hasSubmittedRef.current = false;
    }
  }

  const inputClass = "w-full bg-ivory border border-bronze rounded-sm px-4 py-3 font-sans text-ink placeholder:text-aged-gray focus:outline-none focus:border-burnt-orange transition-colors";

  return (

    <div className="bg-ivory min-h-screen px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/#products"
            className="font-mono text-[12px] tracking-[0.2em] text-olive hover:text-burnt-orange transition-colors"
          >
            CASES
          </Link>

          <span className="font-mono text-[12px] text-olive/40">
            /
          </span>

          <Link
            href="/cart"
            className="font-mono text-[12px] tracking-[0.2em] text-olive hover:text-burnt-orange transition-colors"
          >
            CART
          </Link>

          <span className="font-mono text-[12px] text-olive/40">
            /
          </span>

          <span className="font-mono text-[12px] tracking-[0.2em] text-aged-gray">
            CHECKOUT
          </span>
        </div>
        <p className="font-mono text-xs tracking-widest text-bronze mb-4">— CHECKOUT</p>
        <h1 className="font-display text-4xl text-ink mb-8">Checkout</h1>

        <div className="bg-case-paper border border-bronze rounded-sm p-6 mb-8">
          <h2 className="font-mono text-xs tracking-widest text-bronze mb-4">ORDER SUMMARY</h2>
          {items.map((item) => (
            <p key={item.id} className="font-sans text-ink text-sm mb-1">
              {item.name} × {item.quantity} — Rs. {item.price * item.quantity}
            </p>
          ))}
          <p className="font-display text-xl text-ink mt-4 pt-4 border-t border-bronze/30">Total: Rs. {total}</p>
        </div>

        <h2 className="font-mono text-xs tracking-widest text-bronze mb-4">YOUR DETAILS</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            minLength={3}
            className={inputClass}
          />

          <input
            type="tel"
            placeholder="Phone / WhatsApp number"
            value={phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');

              if (value.length <= 11) {
                setPhone(value);
              }
            }}
            required
            maxLength={11}
            inputMode="numeric"
            className={inputClass}
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            minLength={5}
            className={inputClass}
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            minLength={2}
            className={inputClass}
          />

          <h2 className="font-mono text-xs tracking-widest text-bronze pt-4">
            PAYMENT METHOD
          </h2>

          <div className="space-y-2">
            <label className="flex items-center gap-3 font-sans text-ink cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="accent-burnt-orange"
              />
              Cash on Delivery
            </label>

            <label className="flex items-center gap-3 font-sans text-ink cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'online_transfer'}
                onChange={() => setPaymentMethod('online_transfer')}
                className="accent-burnt-orange"
              />
              Online Bank Transfer
            </label>
          </div>

          {errorMsg && (
            <p className="text-burnt-orange font-sans text-sm">
              {errorMsg}
            </p>
          )}

          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="w-full bg-burnt-orange hover:bg-amber disabled:opacity-50 text-ivory font-sans font-semibold px-8 py-4 rounded-sm transition-colors mt-6"
          >
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>

      </div>
    </div>
  );
}