"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface BokehElement {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

export default function BookingCTA() {
  const [bokehElements, setBokehElements] = useState<BokehElement[]>([]);

  useEffect(() => {
    const elements = Array.from({ length: 20 }, (_, index) => ({
      id: index,
      width: Math.random() * 150 + 50,
      height: Math.random() * 150 + 50,
      x: Math.random() * window.innerWidth,
      y: Math.random() * 400 - 100,
    }));
    setBokehElements(elements);
  }, []);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 -z-10" />
      
      {/* Animated bokeh effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {bokehElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: element.width,
              height: element.height,
              x: element.x,
              y: element.y,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      <div className="container max-w-4xl mx-auto text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Bring Your Tattoo Vision to Life?</h2>
          <p className="text-xl mb-10 text-purple-100 max-w-2xl mx-auto">
            Book your consultation today and take the first step towards wearable art that tells your unique story.
          </p>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button asChild size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-700">
              <Link href="/booking">Book Your Session Now</Link>
            </Button>
          </motion.div>
          
          <p className="mt-6 text-purple-200">
            Spaces are limited. Secure your appointment today.
          </p>
        </motion.div>
      </div>
    </section>
  );
}