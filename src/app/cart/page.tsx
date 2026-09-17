'use client';

import { useCartStore } from '@/lib/cart/store';
import Link from 'next/link';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleDecrease(id: string, currentQty: number) {
    if (currentQty <= 1) {
      removeItem(id);
    } else {
      updateQuantity(id, currentQty - 1);
    }
  }

  if (items.length === 0) {
    return (
      <div className="bg-ivory min-h-screen px-6 py-16 text-center">
        <p className="font-mono text-xs tracking-widest text-bronze mb-4">CASE FILE — EMPTY</p>
        <p className="font-display text-3xl text-ink mb-6">Your cart is empty.</p>
        <Link href="/#products" className="text-burnt-orange hover:text-amber font-sans transition-colors">
          Browse Cases →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-xs tracking-widest text-bronze mb-4">DOSSIER — YOUR CART</p>
        <h1 className="font-display text-4xl text-ink mb-8">Cart</h1>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="bg-case-paper border border-bronze rounded-sm p-4 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-sans font-semibold text-ink">{item.name}</p>
                <p className="font-sans text-sm text-aged-gray">Rs. {item.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrease(item.id, item.quantity)}
                  className="w-8 h-8 border border-bronze text-ink hover:bg-bronze hover:text-ivory transition-colors rounded-sm"
                >
                  −
                </button>
                <span className="font-mono text-ink w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 border border-bronze text-ink hover:bg-bronze hover:text-ivory transition-colors rounded-sm"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="font-sans text-sm text-burnt-orange hover:text-amber transition-colors ml-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-bronze pt-6">
          <p className="font-display text-2xl text-ink">Total: Rs. {total}</p>
          <Link
            href="/checkout"
            className="bg-burnt-orange hover:bg-amber text-ivory font-sans font-semibold px-8 py-3 rounded-sm transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}