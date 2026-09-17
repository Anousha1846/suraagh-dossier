'use client';

import { useCartStore } from '@/lib/cart/store';
import { useState } from 'react';

export function AddToCartButton({ product }: { product: { id: string; slug: string; name: string; price: number } }) {
  const addItem = useCartStore((state) => state.addItem);
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleAdd() {
    addItem(product);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000);
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={handleAdd}
        className="bg-burnt-orange hover:bg-amber text-ivory font-sans font-semibold px-8 py-3 rounded-sm transition-colors"
      >
        Add to Cart
      </button>

      {showConfirmation && (
        <p className="font-mono text-xs text-burnt-orange mt-2">
          ✓ Added to cart
        </p>
      )}
    </div>
  );
}