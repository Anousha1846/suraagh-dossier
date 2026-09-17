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

  function handleDecrease(id: string, currentQty: number) {
    if (currentQty <= 1) {
      removeItem(id);
    } else {
      updateQuantity(id, currentQty - 1);
    }
  }

  return (
    <div>
      <h1>Cart</h1>
      {items.map((item) => (
        <div key={item.id}>
          <p>{item.name} — Rs. {item.price}</p>
          <button onClick={() => handleDecrease(item.id, item.quantity)}>−</button>
          <span> {item.quantity} </span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => removeItem(item.id)}>Remove entirely</button>
        </div>
      ))}
      <p>Total: Rs. {total}</p>
      <Link href="/checkout">Proceed to Checkout</Link>
    </div>
  );
}