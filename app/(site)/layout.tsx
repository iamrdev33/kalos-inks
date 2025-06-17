import './../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { kalosFont, mainFont } from '../fonts';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kalos Inks | Premium Tattoo Studio',
  description: 'Kalos Inks is a premier tattoo studio specializing in custom designs, ready-made designs, cover-ups and retouches. Book your appointment today.',
  keywords: 'tattoo, tattoo studio, custom tattoo, tattoo design, cover-up, retouch, piercing, Kalos Inks, Kalos',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kalosinks.com',
    title: 'Kalos Inks | Premium Tattoo Studio',
    description: 'Kalos Inks is a premier tattoo studio specializing in cucustom designs, ready-made designs, cover-ups and retouches.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kalos Inks Tattoo Studio',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.className, `bg-white text-gray-900 min-h-screen flex flex-col ${kalosFont.variable} ${mainFont.variable}`)}>

        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}