'use client';

import { useCartStore } from '@/lib/cart/store';

export function AddToCartButton({ product }: { product: { id: string; slug: string; name: string; price: number } }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button onClick={() => addItem(product)}>
        AddtoCart
    </button>
  );
}