import '@/global.css';
import type { Metadata } from "next";
import Navbar from './components/navbar';
import { kalosFont, mainFont } from '../fonts';

export const metadata: Metadata = {
  title: "Kalos Inks",
  description: "An interactive portfolio showcasing Kalos' work and client reviews.",
  icons: "/favicon.ico"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${kalosFont.variable} ${mainFont.variable}`}>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
