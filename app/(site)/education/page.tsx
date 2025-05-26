"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Activity, CheckCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const educationSections = [
  {
    id: "pain-chart",
    title: "Pain Chart Guide",
    description: "Interactive guide showing tattoo pain levels across different body parts.",
    icon: Activity,
    image: "https://images.pexels.com/photos/4125646/pexels-photo-4125646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "purple"
  },
  {
    id: "aftercare",
    title: "Aftercare Guide",
    description: "Detailed instructions for proper tattoo healing and maintenance.",
    icon: BookOpen,
    image: "https://images.pexels.com/photos/4125672/pexels-photo-4125672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "blue"
  },
  {
    id: "preparation",
    title: "Preparation Checklist",
    description: "Everything you need to know and do before your tattoo appointment.",
    icon: CheckCircle,
    image: "https://images.pexels.com/photos/4125637/pexels-photo-4125637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "green"
  },
  {
    id: "styles-quiz",
    title: "Find Your Style Quiz",
    description: "Interactive quiz to help you discover your perfect tattoo style.",
    icon: HelpCircle,
    image: "https://images.pexels.com/photos/4125590/pexels-photo-4125590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "orange"
  }
];

export default function EducationHub() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
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
          title="Education Hub" 
          subtitle="Learn everything you need to know about tattoos, from pain levels to aftercare and more."
          center
        />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {educationSections.map((section) => (
            <motion.div 
              key={section.id}
              variants={itemVariants}
              className="relative group"
              onMouseEnter={() => setHoveredCard(section.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link href={`/education/${section.id}`}>
                <div className="relative overflow-hidden rounded-xl shadow-lg h-80">
                  <Image 
                    src={section.image}
                    alt={section.title}
                    className={cn(
                      "object-cover transition-transform duration-700",
                      hoveredCard === section.id ? "scale-110" : "scale-100"
                    )}
                    fill
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        section.color === "purple" && "bg-purple-600/80",
                        section.color === "blue" && "bg-blue-600/80",
                        section.color === "green" && "bg-green-600/80",
                        section.color === "orange" && "bg-orange-600/80"
                      )}>
                        <section.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold">{section.title}</h3>
                    </div>
                    <p className="text-gray-200 mb-4">{section.description}</p>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={hoveredCard === section.id ? 
                        { opacity: 1, x: 0 } : 
                        { opacity: 0, x: -10 }
                      }
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-1 text-purple-300"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* FAQ Preview */}
        <div className="max-w-4xl mx-auto mt-24 p-8 bg-purple-50 rounded-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
            <p className="text-gray-600">
              Check out our comprehensive FAQ section for answers to common tattoo questions.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-purple-700">How long does a tattoo take to heal?</h3>
              <p className="mt-2 text-gray-600">
                The surface healing takes about 2-3 weeks, but complete healing beneath the skin can take up to 6 months.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-purple-700">What should I wear to my tattoo appointment?</h3>
              <p className="mt-2 text-gray-600">
                Wear loose, comfortable clothing that can easily expose the area being tattooed while maintaining your comfort and modesty.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-purple-700">Do you offer numbing options?</h3>
              <p className="mt-2 text-gray-600">
                Yes, we offer topical numbing creams for sensitive areas or longer sessions. Please discuss this with your artist during consultation.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link href="/faq" className="flex items-center gap-2">
                View All FAQs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}