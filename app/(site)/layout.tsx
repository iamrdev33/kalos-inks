import '@/global.css';
import type { Metadata } from "next";
import { inter, lusitana } from '../ui/fonts';
import Navbar from './components/navbar';

export const metadata: Metadata = {
  title: "Kalos Inks",
  description: "An interactive portfolio showcasing Kalos' work and client reviews.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
