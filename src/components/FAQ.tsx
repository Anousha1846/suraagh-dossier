'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'How does it work?',
    a: 'Choose a case, gather your team, and investigate the evidence inside the dossier. Read the statements, examine the clues, connect the details, and work together to uncover what really happened.',
  },
  {
    q: 'How long does a case take?',
    a: 'Most cases are designed to take around 60 to 120 minutes, depending on the size of your group and how deeply you investigate.',
  },
  {
    q: 'How many people can play?',
    a: 'Each case has its own recommended player range. You can find the exact number of players on the individual case file.',
  },
  {
    q: 'Do you ship nationwide?',
    a: 'Yes. We currently ship cases across Pakistan. Delivery times and charges may vary depending on your location.',
  },
  {
    q: 'Do I need any special equipment?',
    a: 'No. Everything you need to investigate the case is included in your dossier. All you need is your team, your attention to detail, and a willingness to question everything.',
  },
  {
    q: 'Are the cases suitable for beginners?',
    a: 'Absolutely. Every case has a difficulty level so you can choose an investigation that matches your experience.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative bg-obsidian text-ivory px-6 sm:px-10 lg:px-16 py-20 md:py-28 overflow-hidden"
    >
      {/* Ambient dossier details */}
      <div className="absolute top-0 left-0 w-full h-px bg-olive/30" />

      <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full border border-olive/10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full border border-olive/10 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-14 md:mb-16">

          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-burnt-orange" />

            <p className="font-mono text-[11px] tracking-[0.25em] text-aged-gray uppercase">
              Restricted Information
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

            <div>
              <h2 className="font-display font-bold text-5xl md:text-6xl text-ivory">
                Questions?
              </h2>
            </div>

            <p className="font-sans text-sm text-aged-gray leading-relaxed max-w-sm">
              Before opening a case, you may want to know what you're getting
              yourself into.
            </p>

          </div>
        </div>

        {/* FAQ */}
        <div className="border-t border-olive/30">

          {faqs.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className={`border-b border-olive/30 transition-colors duration-300 ${
                  isOpen ? 'bg-olive/5' : ''
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 text-left py-6 md:py-7 px-2 group"
                >

                  <div className="flex items-start gap-5 md:gap-8">

                    <span className="font-mono text-[10px] tracking-widest text-burnt-orange pt-1.5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span
                      className={`font-sans text-base md:text-lg transition-colors duration-300 ${
                        isOpen
                          ? 'text-ivory'
                          : 'text-ivory/80 group-hover:text-ivory'
                      }`}
                    >
                      {item.q}
                    </span>

                  </div>

                  <span
                    className={`flex items-center justify-center w-8 h-8 border shrink-0 font-mono text-lg transition-all duration-300 ${
                      isOpen
                        ? 'border-burnt-orange text-burnt-orange rotate-0'
                        : 'border-olive/50 text-aged-gray group-hover:border-ivory/50 group-hover:text-ivory'
                    }`}
                  >
                    {isOpen ? '−' : '+'}
                  </span>

                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">

                    <div className="pl-[52px] md:pl-[72px] pr-10 pb-7">
                      <p className="font-sans text-sm md:text-[15px] text-aged-gray leading-7 max-w-2xl">
                        {item.a}
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}

        </div>

        {/* Bottom note */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-5">

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-burnt-orange" />

            <p className="font-mono text-[10px] tracking-[0.18em] text-aged-gray">
              INFORMATION CLASSIFICATION: PUBLIC
            </p>
          </div>

          <p className="font-mono text-[10px] tracking-widest text-olive">
            TRUST NO DETAIL
          </p>

        </div>

      </div>
    </section>
  );
}
