'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleLogin() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg('Invalid email or password.');
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="bg-obsidian min-h-screen flex items-center justify-center px-6">
      <div className="bg-charcoal border border-bronze rounded-sm p-8 max-w-sm w-full">
        <p className="font-mono text-xs tracking-widest text-bronze mb-4">RESTRICTED ACCESS</p>
        <h1 className="font-display text-3xl text-ivory mb-6">Admin Login</h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-ivory border border-bronze rounded-sm px-4 py-3 font-sans text-ink placeholder:text-aged-gray"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-ivory border border-bronze rounded-sm px-4 py-3 font-sans text-ink placeholder:text-aged-gray"
          />
          {errorMsg && <p className="text-burnt-orange font-sans text-sm">{errorMsg}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-burnt-orange hover:bg-amber text-ivory font-sans font-semibold px-8 py-3 rounded-sm transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}