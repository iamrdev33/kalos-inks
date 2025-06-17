"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Brush, Droplet, Hand, SprayCan, PencilRuler, Shield } from 'lucide-react';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [equipmentRef, equipmentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-700 -z-10" />
        
        <div className="container text-white text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Kalos Inks</h1>
            <p className="text-xl max-w-3xl mx-auto text-purple-100">
              Where artistry meets precision to create wearable masterpieces that tell your unique story.
            </p>
          </motion.div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,96L60,80C120,64,240,32,360,21.3C480,11,600,21,720,42.7C840,64,960,96,1080,96C1200,96,1320,64,1380,48L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>
      
      {/* Story Section */}
      <section ref={ref} className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text-purple">Our Story</span>
              </h2>
              <p className="text-gray-700 mb-6">
                Kalos Inks was born from a passion for creating unique, meaningful art that becomes a part of our clients' personal stories. With over a decade of experience in the tattoo industry, our studio combines traditional techniques with modern innovation.
              </p>
              <p className="text-gray-700 mb-6">
                Our approach focuses on collaboration — we believe that the best tattoos come from a true partnership between artist and client. We take the time to understand your vision, offering guidance and artistic expertise to create a design that exceeds your expectations.
              </p>
              <p className="text-gray-700 mb-6">
                Whether you're getting your first tattoo or adding to an existing collection, we're committed to providing a comfortable, professional experience in a clean, welcoming environment.
              </p>
              <div className="mt-6">
                <Button asChild variant="gradient">
                  <Link href="/booking">Book a Consultation</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src="https://images.pexels.com/photos/1604869/pexels-photo-1604869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Tattoo artist at work"
                  className="object-cover"
                  fill
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Studio Tour */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <SectionHeading 
            title="Our Studio" 
            subtitle="Take a virtual tour of our clean, modern space designed for comfort and creativity."
            center
          />
          
          <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Kalos Inks Tattoo Studio"
              className="object-cover"
              width={1200}
              height={675}
            />
            {/* Note: In a real implementation, this could be replaced with an embedded video */}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our studio is designed to provide a relaxing, inspiring environment for both clients and artists. We maintain the highest standards of cleanliness and safety, using only premium equipment and supplies.
            </p>
          </div>
        </div>
      </section>
      
      {/* Equipment Showcase */}
      <section 
        ref={equipmentRef} 
        className="py-20 bg-gradient-to-r from-purple-900 to-purple-700 text-white"
      >
        <div className="container">
          <SectionHeading 
            title="Premium Equipment" 
            subtitle="We use only the highest quality tools and supplies to ensure exceptional results and safety."
            center
            className="text-white"
          />
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            variants={containerVariants}
            initial="hidden"
            animate={equipmentInView ? "visible" : "hidden"}
          >
            <motion.div 
              className="glass-morphism-dark rounded-lg p-6"
              variants={itemVariants}
            >
              <div className="bg-purple-600/50 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <PencilRuler className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4">Professional Machines</h3>
              <p className="text-gray-200">
                Our custom rotary machines deliver precise, consistent lines and smooth shading for exceptional results with minimal discomfort.
              </p>
            </motion.div>
            
            <motion.div 
              className="glass-morphism-dark rounded-lg p-6"
              variants={itemVariants}
            >
              <div className="bg-purple-600/50 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Droplet className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4">Premium Inks</h3>
              <p className="text-gray-200">
                We use only the highest quality, vegan-friendly inks that provide vibrant colors, rich blacks, and exceptional longevity.
              </p>
            </motion.div>
            
            <motion.div 
              className="glass-morphism-dark rounded-lg p-6"
              variants={itemVariants}
            >
              <div className="bg-purple-600/50 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4">Sterile Practices</h3>
              <p className="text-gray-200">
                All our equipment is thoroughly sterilized, and we use disposable needles and supplies to maintain the highest safety standards.
              </p>
            </motion.div>
            
            <motion.div 
              className="glass-morphism-dark rounded-lg p-6"
              variants={itemVariants}
            >
              <div className="bg-purple-600/50 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Brush className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4">Quality Needles</h3>
              <p className="text-gray-200">
                We use premium needles in various configurations to achieve precise lines, smooth shading, and vibrant color packing.
              </p>
            </motion.div>
            
            <motion.div 
              className="glass-morphism-dark rounded-lg p-6"
              variants={itemVariants}
            >
              <div className="bg-purple-600/50 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <SprayCan className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4">Aftercare Products</h3>
              <p className="text-gray-200">
                We provide high-quality aftercare products and detailed instructions to ensure optimal healing and longevity of your tattoo.
              </p>
            </motion.div>
            
            <motion.div 
              className="glass-morphism-dark rounded-lg p-6"
              variants={itemVariants}
            >
              <div className="bg-purple-600/50 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Hand className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4">Comfort Materials</h3>
              <p className="text-gray-200">
                From ergonomic furniture to numbing products, we prioritize your comfort throughout the tattooing process.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Studio Rules */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeading 
            title="Studio Etiquette" 
            subtitle="To ensure the best experience for everyone, we ask that you follow these guidelines when visiting our studio."
            center
          />
          
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-purple-200 -translate-x-1/2"></div>
            
            {/* Timeline items */}
            <div className="relative space-y-16">
              {[
                {
                  title: "Arrive Prepared",
                  content: "Come to your appointment well-rested, hydrated, and having eaten a substantial meal. Avoid alcohol for at least 24 hours before your session."
                },
                {
                  title: "Respect the Schedule",
                  content: "Please arrive 15 minutes before your appointment. If you need to reschedule, provide at least 48 hours notice to avoid losing your deposit."
                },
                {
                  title: "Minimal Guests",
                  content: "Due to space limitations, we allow only one guest per client. Please inform us beforehand if you plan to bring someone."
                },
                {
                  title: "Communication is Key",
                  content: "Feel free to ask questions or request breaks during your session. Clear communication helps us create the best experience for you."
                },
                {
                  title: "Follow Aftercare",
                  content: "For optimal results, carefully follow the aftercare instructions provided after your session. Contact us with any healing concerns."
                }
              ].map((rule, index) => (
                <motion.div 
                  key={index}
                  className="relative flex flex-col md:flex-row"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Timeline marker */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-purple-700 z-10 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <div className={`md:w-1/2 pt-2 pb-8 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-bold mb-2 text-purple-700">{rule.title}</h3>
                      <p className="text-gray-700">{rule.content}</p>
                    </div>
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? '' : ''}`}></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-purple-50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Tattoo Journey?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Book a consultation with us to discuss your ideas and create a custom design that's uniquely yours.
          </p>
          <Button asChild size="lg" variant="gradient">
            <Link href="/booking">Book Your Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}