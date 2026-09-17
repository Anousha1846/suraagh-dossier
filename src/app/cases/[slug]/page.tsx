import { supabase } from '@/lib/supabase/client';
import { notFound } from 'next/navigation';
import { AddToCartButton } from './AddToCartButton';
import Link from 'next/link';

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !product) notFound();

  return (
    <div className="bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="font-mono text-xs tracking-widest text-bronze mb-6">
          CASE FILE — {product.status.toUpperCase()}
        </p>

        {product.cover_image_url && (
          <img
            src={product.cover_image_url}
            alt={product.name}
            className="w-full h-64 md:h-96 object-cover rounded-sm border border-bronze mb-8"
          />
        )}

        <h1 className="font-display text-4xl md:text-5xl text-ink mb-2">{product.name}</h1>
        <p className="font-sans text-lg text-aged-gray italic mb-8">{product.tagline}</p>

        <div className="bg-case-paper border border-bronze rounded-sm p-6 md:p-8 mb-8">
          <p className="font-sans text-ink leading-relaxed mb-6">{product.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-sm text-bronze border-t border-bronze/30 pt-6">
            <div>
              <p className="text-xs text-aged-gray mb-1">DIFFICULTY</p>
              <p className="text-ink">{'★'.repeat(product.difficulty)}{'☆'.repeat(5 - product.difficulty)}</p>
            </div>
            <div>
              <p className="text-xs text-aged-gray mb-1">PLAYERS</p>
              <p className="text-ink">
                {product.player_range_label || `${product.min_players}–${product.max_players}`}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            {product.compare_at_price ? (
              <p className="font-sans text-2xl">
                <span className="line-through text-aged-gray mr-3 text-lg">Rs. {product.compare_at_price}</span>
                <span className="text-burnt-orange font-semibold">Rs. {product.price}</span>
              </p>
            ) : (
              <p className="font-sans text-2xl text-ink font-semibold">Rs. {product.price}</p>
            )}
          </div>

          <AddToCartButton product={product} />
        </div>

        <Link href="/cart" className="inline-block mt-6 font-sans text-sm text-bronze hover:text-burnt-orange transition-colors">
          View Cart →
        </Link>
      </div>
    </div>
  );
}