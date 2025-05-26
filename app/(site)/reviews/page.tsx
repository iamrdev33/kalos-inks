"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Star, Plus, ExternalLink } from 'lucide-react';
import { testimonials } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function Reviews() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isAddingReview, setIsAddingReview] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    review: '',
    email: ''
  });

  const totalReviews = testimonials.length;
  const averageRating = (testimonials.reduce((sum, item) => sum + item.rating, 0) / totalReviews).toFixed(1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the review to a backend
    alert('Thanks for your review! It will be visible after moderation.');
    setIsAddingReview(false);
    setFormData({
      name: '',
      rating: 5,
      review: '',
      email: ''
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-900 to-purple-700 text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Client Testimonials</h1>
            <p className="text-xl max-w-3xl mx-auto text-purple-100 mb-8">
              Don't just take our word for it. See what our clients have to say about their experiences at Kalos Inks.
            </p>
            
            <div className="flex justify-center items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm py-3 px-6 rounded-full">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">{averageRating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn(
                          "w-5 h-5", 
                          i < Math.round(Number(averageRating)) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-1">{totalReviews} reviews</p>
              </div>
              
              <Link 
                href="https://google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-white/10 backdrop-blur-sm py-3 px-6 rounded-full hover:bg-white/20 transition-colors"
              >
                Google Reviews
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Digital Polaroid Wall */}
      <section ref={ref} className="py-20 bg-gray-50">
        <div className="container">
          <SectionHeading 
            title="Wall of Love" 
            subtitle="See what our clients are saying about their tattoo experiences."
            center
          />
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Add Review Card */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md overflow-hidden h-[400px] flex flex-col items-center justify-center p-6 border-2 border-dashed border-purple-300 hover:border-purple-500 transition-colors cursor-pointer"
              onClick={() => setIsAddingReview(true)}
            >
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 inline-flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-purple-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Share Your Experience</h3>
                <p className="text-gray-600">
                  We'd love to hear about your tattoo journey with us.
                </p>
              </div>
            </motion.div>
            
            {/* Review Cards */}
            {testimonials.map((testimonial) => (
              <motion.div 
                key={testimonial.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[400px]"
              >
                <div className="p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                      <Image 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="object-cover"
                        fill
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={cn(
                              "w-4 h-4", 
                              i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.testimonial}"</p>
                </div>
                <div className="bg-gray-50 p-4 text-sm text-gray-500">
                  Verified Client
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link 
                href="https://google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Write a Google Review
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Add Review Modal */}
      {isAddingReview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-md w-full p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingChange(rating)}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={cn(
                          "w-8 h-8", 
                          rating <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="review">
                  Your Review
                </label>
                <textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email (will not be published)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsAddingReview(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="gradient">
                  Submit Review
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}