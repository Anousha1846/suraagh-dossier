import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export async function ProductsGrid() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'active');

  if (!products || products.length === 0) {
    return (
      <section
        id="products"
        className="bg-ivory px-6 sm:px-10 lg:px-16 py-20"
      >
        <p className="font-mono text-sm text-ink/60">
          NO ACTIVE CASES FOUND.
        </p>
      </section>
    );
  }

  return (
    <section
      id="products"
      className="relative bg-ivory px-4 lg:px-16 py-10 md:py-24 overflow-hidden"
    >
      {/* Subtle dossier background detail */}
      <div className="absolute top-0 left-0 w-full h-px bg-olive/20" />

      <div className="relative max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-5">
            <span className="h-px w-10 bg-burnt-orange" />

            <p className="font-mono text-[11px] tracking-[0.25em] text-olive uppercase">
              Since You're Asking
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-mono text-sm tracking-[0.18em] text-ink/50 mb-3">
                DOSSIER 001 — ACTIVE CASES
              </p>

              <h2 className="font-display font-bold text-5xl md:text-6xl text-ink">
                Cases
              </h2>
            </div>

            <p className="font-sans text-sm text-olive max-w-sm leading-relaxed">
              Every case contains a story.
              <br />
              Every story leaves a trail.
            </p>
          </div>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/cases/${product.slug}`}
              className="group block"
            >
              <article className="relative h-full bg-aged-gray border border-olive/30 rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]">

                {/* Case Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-olive/10">
                  {product.cover_image_url ? (
                    <img
                      src={product.cover_image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-mono text-xs tracking-widest text-olive/60">
                        NO IMAGE AVAILABLE
                      </span>
                    </div>
                  )}

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-transparent opacity-60" />

                  {/* Case number */}
                  <div className="absolute top-4 left-4 bg-ivory/90 px-3 py-1.5">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-ink">
                      CASE {String(index + 1).padStart(3, '0')}
                    </p>
                  </div>

                  {/* Active label */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-obsidian/85 px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-burnt-orange" />

                    <p className="font-mono text-[9px] tracking-[0.18em] text-ivory">
                      ACTIVE
                    </p>
                  </div>
                </div>

                {/* Case Information */}
                <div className="p-6">

                  <p className="font-mono text-[10px] tracking-[0.2em] text-burnt-orange mb-2">
                    CASE FILE
                  </p>

                  <h3 className="font-display text-3xl text-ink mb-2">
                    {product.name}
                  </h3>

                  {/* Price + CTA */}
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      {product.compare_at_price ? (
                        <div className="flex items-center gap-2">
                          <span className="font-sans text-xs text-ink/40 line-through">
                            Rs. {product.compare_at_price}
                          </span>

                          <span className="font-sans text-lg font-semibold text-burnt-orange">
                            Rs. {product.price}
                          </span>
                        </div>
                      ) : (
                        <p className="font-sans text-lg font-semibold text-ink">
                          Rs. {product.price}
                        </p>
                      )}
                    </div>

                    <span className="font-mono text-[12px] tracking-[0.15em] text-ink transition-all duration-300 group-hover:text-burnt-orange group-hover:translate-x-1">
                      OPEN CASE →
                    </span>
                  </div>
                </div>

                {/* Bottom dossier line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-burnt-orange scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
