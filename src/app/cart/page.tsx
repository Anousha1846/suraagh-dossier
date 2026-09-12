'use client';

import { useCartStore } from '@/lib/cart/store';
import Link from 'next/link';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h1>Cart</h1>
      {items.map((item) => (
        <div key={item.id}>
          <p>{item.name} — Rs. {item.price}</p>
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
          />
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <p>Total: Rs. {total}</p>
      <Link href="/checkout">Proceed to Checkout</Link>
    </div>
  );
}