"use client";

import { Suspense, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { X, DollarSign } from 'lucide-react';
import { flashDesigns } from '@/lib/utils';
import { cn } from '@/lib/utils';

function FlashDesignsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const isBookingFlow = searchParams.get('from') === 'booking';

  const openModal = (id: number) => {
    setSelectedDesign(id);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedDesign(null);
    document.body.style.overflow = 'auto';
  };

  const handleDesignSelect = (design: any) => {
    if (isBookingFlow) {
      // Store selected design in sessionStorage
      sessionStorage.setItem('selectedFlashDesign', JSON.stringify(design));
      router.push('/booking?step=2'); // Skip service selection
    } else if (design.available) {
      router.push(`/booking?design=${design.id}`);
    }
  };

  const categories = ['all', ...new Set(flashDesigns.map(item => item.category))];
  
  const filteredDesigns = flashDesigns.filter(design => 
    activeFilter === 'all' || design.category === activeFilter
  );

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

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <SectionHeading 
          title={isBookingFlow ? "Select Your Flash Design" : "Flash Designs"}
          subtitle={isBookingFlow 
            ? "Choose a design to continue with your booking"
            : "Browse our collection of ready-to-tattoo designs. Choose one you love and book your session."}
          center
        />
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-colors",
                activeFilter === category
                  ? "bg-purple-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
              onClick={() => setActiveFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Designs Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredDesigns.map((design) => (
            <motion.div 
              key={design.id}
              className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              variants={itemVariants}
              onClick={() => openModal(design.id)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative h-[300px]">
                <Image 
                  src={design.image}
                  alt={design.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={400}
                  height={300}
                />
                
                {/* Price tag */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-purple-700 rounded-full py-1 px-3 font-bold flex items-center">
                  <DollarSign className="w-4 h-4 mr-0.5" />
                  {design.price}
                </div>
                
                {/* Availability overlay */}
                {!design.available && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <div className="bg-red-600 text-white transform rotate-45 text-center py-2 w-[200%] absolute">
                      <span className="font-bold">RESERVED</span>
                    </div>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-xl font-bold text-white">{design.title}</h3>
                  <p className="text-gray-200 text-sm mb-2">{design.category}</p>
                  {design.available && (
                    <p className="text-green-300 text-sm">Available Now</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {filteredDesigns.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No designs match the selected category.</p>
          </div>
        )}
        
        {!isBookingFlow && (
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-6">
              Love one of our flash designs? Book your appointment to make it yours.
            </p>
            <Button 
              variant="gradient" 
              size="lg"
              onClick={() => router.push('/booking')}
            >
              Book Your Session
            </Button>
          </div>
        )}
      </div>

      {/* Design Modal */}
      <AnimatePresence>
        {selectedDesign !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl max-h-[90vh] w-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-800 bg-white/90 p-2 rounded-full"
                onClick={closeModal}
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="grid md:grid-cols-2">
                <div className="relative h-[300px] md:h-full">
                  {selectedDesign && (
                    <Image
                      src={flashDesigns.find(item => item.id === selectedDesign)?.image || ''}
                      alt={flashDesigns.find(item => item.id === selectedDesign)?.title || ''}
                      className="w-full h-full object-cover"
                      width={600}
                      height={800}
                    />
                  )}
                </div>
                
                <div className="p-6">
                  {selectedDesign && (
                    <>
                      <h3 className="text-2xl font-bold mb-2">
                        {flashDesigns.find(item => item.id === selectedDesign)?.title}
                      </h3>
                      
                      <div className="flex items-center mb-4">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                          {flashDesigns.find(item => item.id === selectedDesign)?.category}
                        </span>
                      </div>
                      
                      <div className="mb-6">
                        <p className="text-gray-600 mb-4">
                          This is a unique flash design ready to be tattooed. Flash designs are pre-drawn artwork that can be tattooed as-is or with minor modifications.
                        </p>
                        
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold">Price:</span>
                          <span className="text-xl font-bold text-purple-700">
                            ${flashDesigns.find(item => item.id === selectedDesign)?.price}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <span className="font-bold">Status:</span>
                          {flashDesigns.find(item => item.id === selectedDesign)?.available ? (
                            <span className="text-green-600 font-medium">Available</span>
                          ) : (
                            <span className="text-red-600 font-medium">Reserved</span>
                          )}
                        </div>
                      </div>
                      
                      {flashDesigns.find(item => item.id === selectedDesign)?.available && (
                        <Button 
                          variant="gradient" 
                          className="w-full"
                          onClick={() => {
                            const design = flashDesigns.find(item => item.id === selectedDesign);
                            handleDesignSelect(design);
                            closeModal();
                          }}
                        >
                          {isBookingFlow ? 'Select This Design' : 'Book This Design'}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FlashDesigns() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <FlashDesignsContent />
    </Suspense>
  );
}