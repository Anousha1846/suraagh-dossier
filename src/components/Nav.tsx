'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/#products', label: 'Cases' },
    { href: '/#about', label: 'About' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/#contact', label: 'Contact' },
    { href: '/track-order', label: 'Track Order' },
  ];

  return (
    <nav className="bg-obsidian text-ivory px-6 py-3 font-sans relative z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-2xl tracking-wide"
        >
          Suraagh Dossier
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-amber transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Desktop Cart */}
          <Link
            href="/cart"
            className="sm:mr-8 hover:text-amber transition-colors flex items-center"
            aria-label="Cart"
          >
            <ShoppingCart
              size={25}
              strokeWidth={2.2}
            />
          </Link>
        </div>

        {/* Mobile Cart + Menu */}
        <div className="md:hidden flex items-center gap-5">
          <Link
            href="/cart"
            className="text-ivory hover:text-amber transition-colors flex items-center"
            aria-label="Cart"
          >
            <ShoppingCart
              size={21}
              strokeWidth={2.2}
            />
          </Link>

          <button
            className="text-ivory"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <>
          {/* Click anywhere outside the menu to close */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile dropdown */}
          <div className="relative z-50 md:hidden flex flex-col items-center gap-4 mt-4 pb-2 text-sm">
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
        </>
      )}
    </nav>
  );
}
