const faqs = [
  { q: 'How does it work?', a: 'Placeholder answer.' },
  { q: 'How long does a case take?', a: 'Placeholder answer.' },
  { q: 'Do you ship nationwide?', a: 'Placeholder answer.' },
];

export function FAQ() {
  return (
    <section id="faq">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
    </section>
  );
}