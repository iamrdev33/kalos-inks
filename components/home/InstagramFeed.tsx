"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Instagram } from 'lucide-react';
import { portfolio } from '@/lib/utils';

export default function InstagramFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const instagramPosts = portfolio.slice(0, 8);

  return (
    <section ref={containerRef} className="section-padding bg-white overflow-hidden">
      <div className="container">
        <SectionHeading 
          title="Follow Our Journey" 
          subtitle="Stay updated with our latest work and behind-the-scenes moments."
          center
        />
        
        <div className="flex items-center justify-center mb-8">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span className="font-medium">@kalosinks</span>
          </a>
        </div>
        
        <div className="relative w-full overflow-hidden">
          <motion.div 
            className="flex gap-4"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
          >
            {instagramPosts.map((post) => (
              <motion.div 
                key={post.id}
                className="min-w-[250px] h-[250px] relative group overflow-hidden rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  width={250}
                  height={250}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-medium text-sm">{post.title}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="bg-purple-700/80 text-white text-xs px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />
        </div>
        
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Drag to explore more</p>
        </div>
      </div>
    </section>
  );
}