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

  const inputClass = "w-full bg-ivory border border-bronze rounded-sm px-4 py-3 font-sans text-ink placeholder:text-aged-gray focus:outline-none focus:border-burnt-orange transition-colors";

  return (
    <div className="bg-ivory min-h-screen px-6 py-16">
      <div className="max-w-lg mx-auto">
        <p className="font-mono text-xs tracking-widest text-bronze mb-4">CASE LOOKUP</p>
        <h1 className="font-display text-4xl text-ink mb-8">Track Your Order</h1>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Order number (e.g. SD-123456)"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className={inputClass}
          />
          <input
            type="tel"
            placeholder="Phone number used at checkout"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full bg-burnt-orange hover:bg-amber disabled:opacity-50 text-ivory font-sans font-semibold px-8 py-3 rounded-sm transition-colors"
          >
            {isSearching ? 'Searching...' : 'Track Order'}
          </button>
        </div>

        {errorMsg && <p className="font-sans text-burnt-orange text-sm mb-6">{errorMsg}</p>}

        {result && (
          <div className="bg-case-paper border border-bronze rounded-sm p-6">
            <p className="font-mono text-xs tracking-widest text-bronze mb-2">{result.order_number}</p>
            <p className="font-sans text-ink text-sm mb-1">Status: <span className="font-semibold">{result.status}</span></p>
            <p className="font-sans text-ink text-sm mb-4">Payment: <span className="font-semibold">{result.payment_status}</span></p>

            <p className="font-mono text-xs tracking-widest text-bronze mb-2 pt-4 border-t border-bronze/30">ITEMS</p>
            {result.order_items.map((item: any) => (
              <p key={item.id} className="font-sans text-ink text-sm mb-1">
                {item.product_name} × {item.quantity} — Rs. {item.line_total}
              </p>
            ))}
            <p className="font-display text-xl text-ink mt-4">Total: Rs. {result.total}</p>
          </div>
        )}
      </div>
    </div>
  );
}