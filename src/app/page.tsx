import { Hero } from '@/components/Hero';
import { ProductsGrid } from '@/components/ProductsGrid';
import { About } from '@/components/About';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <ProductsGrid />
      <FAQ />
            <About />
      <Contact />
    </div>
  );
}