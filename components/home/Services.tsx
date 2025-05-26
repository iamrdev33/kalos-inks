"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/utils';

export default function Services() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <SectionHeading 
          title="Our Services" 
          subtitle="From custom designs to cover-ups, we offer a full range of tattoo services to bring your vision to life."
          center
        />
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              className="group relative overflow-hidden rounded-xl shadow-lg"
              variants={itemVariants}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="aspect-w-3 aspect-h-2 h-64 relative">
                <Image 
                  src={service.image}
                  alt={service.title}
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-200 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-purple-200">
                    Starting at <span className="font-semibold">${service.minPrice}</span>
                  </p>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={hoveredService === service.id ? 
                      { opacity: 1, x: 0 } : 
                      { opacity: 0, x: -10 }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <Button asChild size="sm" variant="gradient" className="rounded-full">
                      <Link href="/booking">
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}