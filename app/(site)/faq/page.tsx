"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Mail } from 'lucide-react';
import { faqCategories } from '@/lib/utils';

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Filter questions based on search query
  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      searchQuery === '' || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));
  
  // Get related questions based on current active question
  const getRelatedQuestions = (currentQuestion: string) => {
    const allQuestions = faqCategories.flatMap(cat => cat.questions);
    // Simple implementation - in a real app, this would use more sophisticated matching
    return allQuestions
      .filter(q => q.question !== currentQuestion)
      .slice(0, 3); // Return top 3 related questions
  };
  
  const currentCategoryQuestions = filteredFAQs.find(cat => cat.id === activeCategory)?.questions || [];
  
  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <SectionHeading 
          title="Frequently Asked Questions" 
          subtitle="Find answers to common questions about tattoos, our services, and aftercare."
          center
        />
        
        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* FAQ Tabs */}
        <Tabs defaultValue="general" className="max-w-4xl mx-auto" onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-1 sm:grid-cols-3 mb-8">
            {faqCategories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {faqCategories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              {filteredFAQs.find(cat => cat.id === category.id)?.questions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No questions found matching your search.</p>
                </div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.find(cat => cat.id === category.id)?.questions.map((faq, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <AccordionItem value={`item-${index}`}>
                          <AccordionTrigger className="text-left font-semibold">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pt-2 pb-4">
                              <p className="text-gray-700">{faq.answer}</p>
                              
                              {/* Related Questions */}
                              {getRelatedQuestions(faq.question).length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <h4 className="text-sm font-semibold text-gray-500 mb-2">Related Questions</h4>
                                  <ul className="space-y-2">
                                    {getRelatedQuestions(faq.question).map((relatedQ, idx) => (
                                      <li key={idx}>
                                        <button 
                                          className="text-purple-700 text-sm hover:underline text-left"
                                          onClick={() => {
                                            // Find the category containing this question
                                            const targetCat = faqCategories.find(cat => 
                                              cat.questions.some(q => q.question === relatedQ.question)
                                            );
                                            if (targetCat) {
                                              setActiveCategory(targetCat.id);
                                              // In a real implementation, we would also open this accordion item
                                            }
                                          }}
                                        >
                                          {relatedQ.question}
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>
                </motion.div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Unanswered Questions */}
        <motion.div 
          className="max-w-4xl mx-auto mt-16 bg-purple-50 rounded-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? We're here to help with any additional questions you might have.
          </p>
          <Button asChild variant="gradient" size="lg">
            <Link href="/contact" className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Us
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}