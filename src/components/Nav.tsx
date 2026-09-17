'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/#products', label: 'Cases' },
    { href: '/#about', label: 'About' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/#contact', label: 'Contact' },
    { href: '/track-order', label: 'Track Order' },
    { href: '/cart', label: 'Cart' },
  ];

  return (
    <nav className="bg-obsidian text-ivory px-6 py-4 font-sans relative">
      <div className="flex items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-wide">
          Suraagh Dossier
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-amber transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-ivory"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 mt-4 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-amber transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}