import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export async function ProductsGrid() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'active');

  if (!products || products.length === 0) {
    return <p>No cases available right now.</p>;
  }

  return (
    <section id="products">
      <h2>Cases</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {products.map((product) => (
          <Link key={product.id} href={`/cases/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
              {product.cover_image_url && (
                <img src={product.cover_image_url} alt={product.name} style={{ width: '100%', borderRadius: '4px' }} />
              )}
              <h3>{product.name}</h3>
              <p>{product.tagline}</p>
              {product.compare_at_price ? (
                <p>
                  <span style={{ textDecoration: 'line-through', color: '#888' }}>
                    Rs. {product.compare_at_price}
                  </span>{' '}
                  Rs. {product.price}
                </p>
              ) : (
                <p>Rs. {product.price}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}