import { supabase } from '@/lib/supabase/client';
import { notFound } from 'next/navigation';
import { AddToCartButton } from './AddToCartButton';
import Link from 'next/link';

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !product) notFound();

  return (
    <div className="min-h-screen bg-obsidian text-ivory">

      <main className="max-w-5xl mx-auto px-2 sm:px-10 lg:px-12 py-4">

        {/* Header */}
        <div className="mb-6">

          <div className="flex items-center gap-4 mb-3">
            <span className="h-px w-10 bg-burnt-orange" />

            <p className="font-mono text-[10px] tracking-[0.25em] text-olive uppercase">
              Case File — {product.status}
            </p>
          </div>



        </div>

        {/* Evidence image */}
        {product.cover_image_url && (
          <div className="group relative rounded-sm w-full h-60 sm:h-72 md:h-96 overflow-hidden border border-olive/30 bg-olive/5 mb-2">

            <img
              src={product.cover_image_url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 bg-obsidian/80 border border-olive/30 px-3 py-1.5">
              <p className="font-mono text-[9px] tracking-[0.18em] text-aged-gray">
                EVIDENCE IMAGE
              </p>
            </div>

          </div>
        )}

        {/* Case card */}
        <div className="relative bg-case-paper rounded-sm text-ink border border-olive/50 mb-10">

          {/* Small dossier corner detail */}
          <div className="absolute top-0 right-0 w-12 h-12 border-l border-b border-olive/25" />

          {/* Case title */}
          <div className="p-6 md:p-8">

            <p className="font-mono text-[10px] tracking-[0.2em] text-burnt-orange mb-3">
              CASE FILE
            </p>

            <h1 className="font-display text-4xl md:text-5xl text-ink mb-2">
              {product.name}
            </h1>

            <p className="font-sans text-sm md:text-base text-ink/60 italic">
              {product.tagline}
            </p>

          </div>

          {/* Investigation brief */}
          <div className="border-t border-olive/30 px-6 py-4 ">

            <p className="font-mono text-[18px] tracking-[0.2em] text-burnt-orange mb-2">
              INVESTIGATION BRIEF
            </p>

            <p className="font-sans text-sm md:text-base leading-7 text-ink/90 max-w-3xl">
              {product.description}
            </p>

          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-olive/30">

            <div className="px-6 md:px-8 py-5 sm:border-r border-olive/30 transition-colors duration-300 hover:bg-olive/5">

              <p className="font-mono text-[12px] tracking-[0.18em] text-olive mb-2">
                DIFFICULTY
              </p>

              <p className="font-mono text-md">
                <span className="text-burnt-orange">
                  {'★'.repeat(product.difficulty)}
                </span>

                <span className="text-olive/30">
                  {'☆'.repeat(5 - product.difficulty)}
                </span>
              </p>

            </div>

            <div className="px-6 md:px-8 py-5 transition-colors duration-300 hover:bg-olive/5">

              <p className="font-mono text-[12px] tracking-[0.18em] text-olive mb-2">
                PLAYERS
              </p>

              <p className="font-mono text-sm text-ink">
                {product.player_range_label ||
                  `${product.min_players}–${product.max_players}`}
              </p>

            </div>

          </div>

        </div>

        {/* Purchase section */}
        <div className="border-t border-olive/30 pt-7 px-2">

          <div className="flex flex-row sm:items-center justify-between gap-6">

            <div>

              <p className="font-mono text-[9px] tracking-[0.2em] text-olive mb-2">
                CASE ACCESS
              </p>

              {product.compare_at_price ? (
                <p className="font-sans text-2xl">

                  <span className="line-through text-aged-gray/60 mr-3 text-sm">
                    Rs. {product.compare_at_price}
                  </span>

                  <span className="text-burnt-orange font-semibold">
                    Rs. {product.price}
                  </span>

                </p>
              ) : (
                <p className="font-sans text-2xl text-ivory font-semibold">
                  Rs. {product.price}
                </p>
              )}

            </div>

            <div className="transition-transform duration-300 hover:-translate-y-0.5">
              <AddToCartButton product={product} />
            </div>

          </div>

          <Link
            href="/cart"
            className="group inline-flex items-center gap-2 mt-5 font-mono text-[11px] tracking-[0.18em]  hover:text-amber text-burnt-orange transition-colors"
          >
            VIEW CART

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>

        {/* Bottom file marker */}
        <div className="mt-7 px-2 pt-5 border-t border-olive/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <p className="font-mono text-[9px] tracking-[0.18em] text-aged-gray/40">
            SURAAGH DOSSIER — CASE ARCHIVE
          </p>

          <p className="font-mono text-[9px] tracking-[0.18em] text-olive">
            EVERY CASE LEAVES A TRAIL.
          </p>

        </div>

      </main>

    </div>
  );
}
