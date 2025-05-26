"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <Image
          src="https://images.pexels.com/photos/1040958/pexels-photo-1040958.jpeg"
          alt="Tattoo artist silhouette"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-purple-700/90 to-purple-500/90" />
      </motion.div>

      {/* Content */}
      <div className="container relative z-10 pt-16 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.2,
          }}
          className="max-w-4xl mx-auto text-white"
        >
          <div className="mb-4 inline-block">
            <Sparkles className="inline-block mr-2 text-yellow-300" size={28} />
            <span className="text-xl bg-white/20 px-4 py-1 rounded-full backdrop-blur-sm">
              Premium Tattoo Artistry
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Vision, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
              Our Masterpiece
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-10 text-purple-100 max-w-2xl mx-auto">
            At Kalos Inks, we transform your ideas into timeless art that tells your unique story.
            Custom designs, expert technique, and an unforgettable experience.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="xl" variant="gradient" className="shadow-lg">
              <Link href="/booking">Book Your Session</Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/portfolio">Explore Our Work</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}