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
    <div>
      <h1>{product.name}</h1>
      <p>{product.tagline}</p>
      <p>{product.description}</p>
      <p>Difficulty: {product.difficulty}/5</p>
      <p>{product.min_players}–{product.max_players} players</p>
      <p>Rs. {product.price}</p>
      <AddToCartButton product={product} />
      <Link href="/cart">View Cart</Link>
    </div>
  );
}