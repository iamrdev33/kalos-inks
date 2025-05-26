"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, autoplay]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.floor(testimonials.length / 2));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.floor(testimonials.length / 2)) % Math.floor(testimonials.length / 2));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <section className="section-padding bg-gradient-to-br from-purple-700 to-purple-900 text-white">
      <div className="container relative">
        <SectionHeading 
          title="What Our Clients Say" 
          subtitle="We take pride in delivering exceptional experiences that leave our clients satisfied and coming back for more."
          center
          className="text-white"
        />
        
        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <div className="h-[400px] relative flex items-center">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div 
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="absolute w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.slice(currentIndex * 2, (currentIndex * 2) + 2).map((testimonial, index) => (
                    <div key={testimonial.id} className="glass-morphism-dark rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
                          <Image 
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="object-cover"
                            fill
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={cn(
                                  "w-4 h-4 mr-1", 
                                  i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                                )}
                              />
                            ))}
                          </div>
                          <p className="text-sm italic mb-2">"{testimonial.testimonial}"</p>
                          <p className="font-semibold text-sm">{testimonial.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 -translate-x-1/2 md:-translate-x-full z-10 bg-white text-purple-700 p-2 rounded-full shadow-lg hover:bg-purple-50 transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 translate-x-1/2 md:translate-x-full z-10 bg-white text-purple-700 p-2 rounded-full shadow-lg hover:bg-purple-50 transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(Math.floor(testimonials.length / 2))].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex ? "bg-white scale-110" : "bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to testimonial set ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
            <Link href="/reviews">
              See All Reviews
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}