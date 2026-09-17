'use client';

import { useState } from 'react';
import { lookupOrder } from './actions';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  async function handleSearch() {
    if (!orderNumber || !phone) {
      setErrorMsg('Enter both your order number and phone number.');
      return;
    }
    setIsSearching(true);
    setErrorMsg('');
    setResult(null);

    const response = await lookupOrder(orderNumber, phone);

    if (response.error) {
      setErrorMsg(response.error);
    } else {
      setResult(response.order);
    }
    setIsSearching(false);
  }

  return (
    <div>
      <h1>Track Your Order</h1>

      <input
        type="text"
        placeholder="Order number (e.g. SD-123456)"
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone number used at checkout"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSearch} disabled={isSearching}>
        {isSearching ? 'Searching...' : 'Track Order'}
      </button>

      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      {result && (
        <div>
          <h2>Order {result.order_number}</h2>
          <p>Status: {result.status}</p>
          <p>Payment: {result.payment_status}</p>
          <h3>Items</h3>
          {result.order_items.map((item: any) => (
            <p key={item.id}>{item.product_name} × {item.quantity} — Rs. {item.line_total}</p>
          ))}
          <p>Total: Rs. {result.total}</p>
        </div>
      )}
    </div>
  );
}