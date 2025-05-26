import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import PortfolioPreview from '@/components/home/PortfolioPreview';
import TestimonialSlider from '@/components/home/TestimonialSlider';
import BookingCTA from '@/components/home/BookingCTA';
import InstagramFeed from '@/components/home/InstagramFeed';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <PortfolioPreview />
      <TestimonialSlider />
      <BookingCTA />
      <InstagramFeed />
    </>
  );
}