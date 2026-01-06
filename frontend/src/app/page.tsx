import { Hero } from '@/features/home/components/Hero';
import { Features } from '@/features/home/components/Features';
import { Stats } from '@/features/home/components/Stats';
import { CarGrid } from '@/features/car-listing/components/CarGrid';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <CarGrid className="bg-background" /> {/* Reusing CarGrid directly as 'Recent Cars' */}
      <Features />
    </>
  );
}
