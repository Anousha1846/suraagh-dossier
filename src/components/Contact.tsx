export function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-obsidian text-ivory px-6 sm:px-10 lg:px-16 py-20 md:py-28 overflow-hidden"
    >
      {/* Dossier detail */}
      <div className="absolute top-0 left-0 w-full h-px bg-olive/30" />

      <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full border border-olive/10 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full border border-olive/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-burnt-orange" />

            <p className="font-mono text-[11px] tracking-[0.25em] text-aged-gray uppercase">
              Need To Talk?
            </p>
          </div>
{/* 
          <p className="font-mono text-xs tracking-[0.18em] text-olive mb-3">
            DOSSIER 004 — CONTACT
          </p> */}

          <h2 className="font-display font-bold text-5xl md:text-6xl text-ivory">
            Get In Touch
          </h2>
        </div>

        {/* Main contact area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left */}
          <div>
            <p className="font-sans text-base md:text-lg text-aged-gray leading-8 max-w-lg mb-8">
              Have a question about a case? Need help with an order?
              Or did you simply uncover something suspicious?
            </p>

            <p className="font-mono text-xs tracking-[0.18em] text-burnt-orange">
              WE'RE LISTENING.
            </p>
          </div>

          {/* Contact details */}
          <div className="border-t border-olive/30">

            {/* WhatsApp */}
            <a
              href="https://wa.me/923000000000"
              className="group flex items-center justify-between gap-6 py-6 border-b border-olive/30"
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-olive mb-2">
                  WHATSAPP
                </p>

                <p className="font-sans text-base text-ivory group-hover:text-burnt-orange transition-colors">
                  0300-0000000
                </p>
              </div>

              <span className="font-mono text-lg text-aged-gray group-hover:text-burnt-orange group-hover:translate-x-1 transition-all">
                →
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:suraaghdossier@gmail.com"
              className="group flex items-center justify-between gap-6 py-6 border-b border-olive/30"
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-olive mb-2">
                  EMAIL
                </p>

                <p className="font-sans text-base text-ivory group-hover:text-burnt-orange transition-colors">
                  suraaghdossier@gmail.com
                </p>
              </div>

              <span className="font-mono text-lg text-aged-gray group-hover:text-burnt-orange group-hover:translate-x-1 transition-all">
                →
              </span>
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="group flex items-center justify-between gap-6 py-6 border-b border-olive/30"
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-olive mb-2">
                  INSTAGRAM
                </p>

                <p className="font-sans text-base text-ivory group-hover:text-burnt-orange transition-colors">
                  @suraaghdossier
                </p>
              </div>

              <span className="font-mono text-lg text-aged-gray group-hover:text-burnt-orange group-hover:translate-x-1 transition-all">
                →
              </span>
            </a>

          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-16 pt-6 border-t border-olive/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-burnt-orange" />

            <p className="font-mono text-[10px] tracking-[0.18em] text-aged-gray">
              COMMUNICATION CHANNEL: OPEN
            </p>
          </div>

          <p className="font-mono text-[10px] tracking-widest text-olive">
            KEEP YOUR SECRETS SAFE
          </p>

        </div>

      </div>
    </section>
  );
}

