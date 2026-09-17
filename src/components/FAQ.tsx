const faqs = [
  { q: 'How does it work?', a: 'Placeholder answer.' },
  { q: 'How long does a case take?', a: 'Placeholder answer.' },
  { q: 'Do you ship nationwide?', a: 'Placeholder answer.' },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-ivory px-6 py-16">
      <p className="font-mono text-xs tracking-widest text-bronze mb-4">DOSSIER 003 — ANSWERS</p>
      <h2 className="font-display text-4xl text-ink mb-8">Frequently Asked Questions</h2>
      <div className="max-w-2xl divide-y divide-bronze/30">
        {faqs.map((item, i) => (
          <div key={i} className="py-4">
            <h3 className="font-sans font-semibold text-ink mb-1">{item.q}</h3>
            <p className="font-sans text-aged-gray text-sm">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}