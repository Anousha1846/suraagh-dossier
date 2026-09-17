import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export async function ProductsGrid() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'active');

  if (!products || products.length === 0) {
    return <p className="px-6 py-12 font-sans text-ink">No cases available right now.</p>;
  }

  return (
    <section id="products" className="bg-ivory px-6 py-16">
      <p className="font-mono text-xs tracking-widest text-bronze mb-4">DOSSIER 001 — ACTIVE CASES</p>
      <h2 className="font-display text-4xl text-ink mb-8">Cases</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link key={product.id} href={`/cases/${product.slug}`} className="block">
            <div className="bg-case-paper border border-bronze rounded-sm overflow-hidden hover:shadow-lg transition-shadow">
              {product.cover_image_url && (
                <img src={product.cover_image_url} alt={product.name} className="w-full h-48 object-cover" />
              )}
              <div className="p-5">
                <p className="font-mono text-xs text-bronze mb-1">CASE FILE</p>
                <h3 className="font-display text-2xl text-ink mb-2">{product.name}</h3>
                <p className="font-sans text-sm text-aged-gray mb-3">{product.tagline}</p>
                {product.compare_at_price ? (
                  <p className="font-sans">
                    <span className="line-through text-aged-gray mr-2">Rs. {product.compare_at_price}</span>
                    <span className="text-burnt-orange font-semibold">Rs. {product.price}</span>
                  </p>
                ) : (
                  <p className="font-sans text-ink font-semibold">Rs. {product.price}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}