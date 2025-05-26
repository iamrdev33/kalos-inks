import { getPortfolioItems } from '@/app/(admin-panel)/sanity/portfolio.query';
import client  from '@/app/(admin-panel)/sanity.client';
import PortfolioGallery from '@/components/portfolio/PortfolioGallery';
import type { PortfolioItem } from '@/app/(admin-panel)/types/portfolio.types';

export const revalidate = 3600;

export default async function Portfolio() {
  // const portfolioItems = await client.fetch<PortfolioItem[]>(getPortfolioItems);

  return (
    <div className="min-h-screen">
      {/* <PortfolioGallery portfolioItems={portfolioItems} /> */}
    </div>
  );
}