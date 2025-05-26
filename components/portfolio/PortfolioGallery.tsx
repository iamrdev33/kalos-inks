"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PortfolioItem } from '@/app/(admin-panel)/types/portfolio.types';

const ITEMS_PER_PAGE = 9;

interface PortfolioGalleryProps {
  portfolioItems: PortfolioItem[];
}

export default function PortfolioGallery({ portfolioItems }: PortfolioGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeHealingFilter, setActiveHealingFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const openModal = (id: string) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const getFilteredItems = () => {
    return portfolioItems.filter(item => {
      const categoryMatch = activeFilter === 'all' || item.category === activeFilter;
      const healingMatch = activeHealingFilter === 'all' || item.healing === activeHealingFilter;
      return categoryMatch && healingMatch;
    });
  };

  const nextImage = () => {
    if (selectedImage === null) return;
    const filteredItems = getFilteredItems();
    const currentIndex = filteredItems.findIndex(item => item._id === selectedImage);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]._id);
  };

  const prevImage = () => {
    if (selectedImage === null) return;
    const filteredItems = getFilteredItems();
    const currentIndex = filteredItems.findIndex(item => item._id === selectedImage);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIndex]._id);
  };

  const filteredItems = getFilteredItems();
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const categories = ['all', ...new Set(portfolioItems.map(item => item.category))];

  // Breakpoints for masonry grid
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedItem = selectedImage ? filteredItems.find(item => item._id === selectedImage) : null;

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <SectionHeading 
          title="Our Portfolio" 
          subtitle="Browse through our collection of unique tattoo designs and custom artwork."
          center
        />
        
        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-lg font-semibold text-purple-700">Style</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm transition-colors",
                      activeFilter === category
                        ? "bg-purple-700 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                    onClick={() => {
                      setActiveFilter(category);
                      setCurrentPage(1);
                    }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-lg font-semibold text-purple-700">Stage</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['all', 'fresh', 'healed'].map(stage => (
                  <button
                    key={stage}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm transition-colors",
                      activeHealingFilter === stage
                        ? "bg-purple-700 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                    onClick={() => {
                      setActiveHealingFilter(stage);
                      setCurrentPage(1);
                    }}
                  >
                    {stage.charAt(0).toUpperCase() + stage.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex w-auto -ml-4"
              columnClassName="pl-4"
            >
              {paginatedItems.map(item => (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  layout
                  className="mb-4"
                >
                  <div 
                    className="group relative rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
                    onClick={() => openModal(item._id)}
                  >
                    <div className="relative aspect-square">
                      <Image 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        width={400}
                        height={400}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.tags.map(tag => (
                            <span key={tag} className="bg-purple-700/80 text-white text-xs px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </motion.div>
        </AnimatePresence>
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No items match the selected filters.</p>
          </div>
        ) : (
          <div className="mt-12 flex justify-center items-center gap-4">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={cn(
                    "w-8 h-8 rounded-full transition-colors",
                    currentPage === index + 1
                      ? "bg-purple-700 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedItem && (
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
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 text-white hover:text-purple-300 bg-black/50 p-2 rounded-full"
                onClick={closeModal}
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="relative h-full">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  width={1200}
                  height={800}
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold text-white">
                    {selectedItem.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedItem.tags.map(tag => (
                      <span key={tag} className="bg-purple-700/80 text-white text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Navigation buttons */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
