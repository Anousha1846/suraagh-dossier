
export function Footer() {
  return (
    <footer className="bg-charcoal text-aged-gray px-6 sm:px-10 lg:px-16 py-10 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Top line */}
        <div className="flex items-center gap-4 mb-8">
          <span className="h-px w-10 bg-burnt-orange" />

          <p className="font-mono text-[10px] tracking-[0.25em] text-aged-gray uppercase">
            End Of File
          </p>
        </div>

        {/* Main footer */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl text-ivory mb-2">
              Suraagh Dossier
            </h3>

            <p className="font-mono text-[10px] tracking-[0.18em] text-olive">
              EVERY CASE LEAVES A TRAIL.
            </p>
          </div>

          {/* Contact */}

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[13px] tracking-widest text-aged-gray transition-all duration-300 hover:text-burnt-orange hover:translate-x-1 cursor-pointer">
              WHATSAPP — 0300-0000000
            </p>

            <p className="font-mono text-[13px] tracking-widest text-aged-gray transition-all duration-300 hover:text-burnt-orange hover:translate-x-1 cursor-pointer">
              EMAIL — suraaghdossier@gmail.com
            </p>
          </div>



        </div>

        {/* Bottom */}
        <div className="mt-8 pt-5 border-t border-olive/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <p className="font-mono text-[11px] tracking-[0.18em] text-olive">
            © {new Date().getFullYear()} SURAAGH DOSSIER
          </p>

          <p className="font-mono text-[11px] tracking-[0.18em] text-aged-gray/60">
            CASE CLOSED.
          </p>

        </div>

      </div>
    </footer>
  );
}