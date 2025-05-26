"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Aftercare phases
const phases = [
  {
    id: "day1",
    title: "Day 1: Initial Care",
    icon: "🛡️",
    content: [
      "Keep the bandage on for 2-4 hours (or as advised by your artist)",
      "Gently wash with lukewarm water and fragrance-free soap",
      "Pat dry with a clean paper towel",
      "Apply a thin layer of recommended aftercare ointment",
      "Do not re-bandage unless instructed to do so",
      "Wash hands thoroughly before touching the tattoo"
    ]
  },
  {
    id: "days2-3",
    title: "Days 2-3: Washing & Moisturizing",
    icon: "💧",
    content: [
      "Wash 2-3 times daily with lukewarm water and fragrance-free soap",
      "Apply a thin layer of aftercare ointment after each wash",
      "Do not let the tattoo soak in water",
      "Wear loose-fitting clothing that won't rub against the tattoo",
      "Sleep in a position that avoids pressure on the tattoo",
      "The tattoo may feel warm, look red, and slightly swollen (normal)"
    ]
  },
  {
    id: "days4-6",
    title: "Days 4-6: Beginning to Heal",
    icon: "🔄",
    content: [
      "Continue washing 2-3 times daily",
      "Switch from ointment to fragrance-free lotion after day 3",
      "The tattoo will likely begin to flake and peel",
      "Do not pick, scratch, or peel loose skin",
      "Avoid direct sunlight on the tattoo",
      "No swimming, saunas, or long baths"
    ]
  },
  {
    id: "week2",
    title: "Week 2: Peeling Stage",
    icon: "✨",
    content: [
      "Continue gentle washing once or twice daily",
      "Apply lotion when the skin feels tight or dry",
      "Most of the flaking and peeling happens during this period",
      "The tattoo may look dull or cloudy as it heals",
      "Continue to avoid sun exposure, swimming, and excessive sweating",
      "Never pick or scratch at scabs, even if they're itchy"
    ]
  },
  {
    id: "weeks3-4",
    title: "Weeks 3-4: Final Healing",
    icon: "🌱",
    content: [
      "Continue moisturizing daily",
      "The tattoo should be mostly healed on the surface",
      "Some areas may still appear shiny or slightly raised",
      "Begin using sunscreen (SPF 50+) on the tattoo when exposed to sun",
      "Avoid tanning beds permanently",
      "Deep healing continues beneath the skin for several more months"
    ]
  }
];

// Common concerns
const concerns = [
  {
    id: "itching",
    title: "Itching",
    content: "Itching is a normal part of the healing process. Resist the urge to scratch, as this can remove ink and cause scarring. Instead, lightly slap the area or apply a cold compress over a clean paper towel. Keep the area moisturized, as dry skin tends to itch more."
  },
  {
    id: "scabbing",
    title: "Scabbing",
    content: "Light scabbing is normal, especially in areas where the artist went over multiple times. Heavy, thick, or colored scabs may indicate an issue. Never pick scabs, as this can remove ink and lead to scarring or patchiness. Let them fall off naturally."
  },
  {
    id: "fading",
    title: "Fading",
    content: "Some fading is normal during healing. The tattoo is initially covered by a thin layer of plasma that makes it look extra vibrant. Once this clears and the skin regenerates, it will appear less intense. Proper aftercare minimizes excessive fading."
  },
  {
    id: "infection",
    title: "Signs of Infection",
    content: "Watch for: increasing pain rather than decreasing, excessive swelling after 3-5 days, hot to touch after 3 days, pus or yellow/green discharge, foul odor, excessive redness spreading beyond the tattoo, fever or chills. Contact us immediately if you notice these symptoms."
  }
];

// Products
const recommendedProducts = [
  {
    name: "Fragrance-Free Soap",
    description: "Gentle, unscented soap for cleaning your new tattoo.",
    examples: ["Dr. Bronner's Unscented Baby Soap", "Dove Sensitive Skin", "H2Ocean Blue Green Foam Soap"],
    when: "Use for washing your tattoo 2-3 times daily throughout the healing process."
  },
  {
    name: "Aftercare Ointment",
    description: "For the first 3-5 days to keep the tattoo moisturized without suffocating it.",
    examples: ["Aquaphor Healing Ointment", "Hustle Butter", "After Inked"],
    when: "Apply a very thin layer after washing during the first 3-5 days."
  },
  {
    name: "Fragrance-Free Lotion",
    description: "Lighter than ointment, for ongoing moisturizing after the first phase of healing.",
    examples: ["Lubriderm Unscented", "Aveeno Daily Moisturizing Lotion", "Cetaphil Moisturizing Lotion"],
    when: "Switch to lotion after the first 3-5 days, continue throughout healing process."
  },
  {
    name: "Sunscreen",
    description: "High SPF protection for healed tattoos to prevent fading.",
    examples: ["Neutrogena Ultra Sheer SPF 70", "Sun Bum Original SPF 50", "Supergoop! Unseen Sunscreen"],
    when: "Only use once tattoo is fully healed (3+ weeks). Apply whenever the tattoo will be exposed to sun."
  }
];

export default function AftercareGuide() {
  const [activePhase, setActivePhase] = useState("day1");
  
  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <SectionHeading 
          title="Tattoo Aftercare Guide" 
          subtitle="Follow these steps for optimal healing and long-lasting results."
          center
        />
        
        <div className="max-w-4xl mx-auto mt-12">
          {/* Intro */}
          <div className="bg-purple-50 rounded-lg p-8 mb-12">
            <h3 className="text-xl font-bold mb-4">Why Aftercare Matters</h3>
            <p className="text-gray-700 mb-6">
              Proper aftercare is crucial for ensuring your tattoo heals beautifully and retains its vibrant appearance for years to come. Following these guidelines will help minimize complications, prevent infection, and ensure the best possible outcome for your new art.
            </p>
            <div className="flex gap-8 justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-700">2-4</p>
                <p className="text-sm text-gray-600">Weeks for<br />Surface Healing</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-700">3-6</p>
                <p className="text-sm text-gray-600">Months for<br />Deep Healing</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-700">100%</p>
                <p className="text-sm text-gray-600">Your<br />Responsibility</p>
              </div>
            </div>
          </div>
          
          {/* Healing Timeline */}
          <h2 className="text-2xl font-bold mb-6">Healing Timeline</h2>
          <div className="space-y-6 mb-16">
            <div className="grid grid-cols-5 gap-2 mb-8">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  className={cn(
                    "py-2 px-3 text-center rounded-lg transition-colors text-sm md:text-base",
                    activePhase === phase.id
                      ? "bg-purple-700 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                  onClick={() => setActivePhase(phase.id)}
                >
                  <span className="block text-xl mb-1">{phase.icon}</span>
                  <span className="hidden md:block">{phase.title.split(':')[0]}</span>
                  <span className="block md:hidden">{phase.id}</span>
                </button>
              ))}
            </div>
            
            {phases.map((phase) => (
              <motion.div
                key={phase.id}
                className={cn(
                  "bg-white rounded-lg p-6 shadow-sm border-l-4 border-purple-700",
                  activePhase === phase.id ? "block" : "hidden"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-4">{phase.title}</h3>
                <ul className="space-y-3">
                  {phase.content.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-purple-700 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          {/* Common Concerns */}
          <h2 className="text-2xl font-bold mb-6">Common Concerns</h2>
          <Accordion type="single" collapsible className="mb-16">
            {concerns.map((concern) => (
              <AccordionItem key={concern.id} value={concern.id}>
                <AccordionTrigger className="text-left">
                  <span className="font-semibold">{concern.title}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">{concern.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          {/* Recommended Products */}
          <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {recommendedProducts.map((product, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-3">{product.description}</p>
                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-gray-500 mb-1">Recommended Brands:</h4>
                  <ul className="text-sm">
                    {product.examples.map((example, i) => (
                      <li key={i} className="text-purple-700">{example}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm bg-purple-50 p-2 rounded">
                  <span className="font-medium">When to use:</span> {product.when}
                </p>
              </div>
            ))}
          </div>
          
          {/* Do's and Don'ts */}
          <h2 className="text-2xl font-bold mb-6">Do's and Don'ts</h2>
          <Tabs defaultValue="dos" className="mb-16">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="dos">Do's</TabsTrigger>
              <TabsTrigger value="donts">Don'ts</TabsTrigger>
            </TabsList>
            <TabsContent value="dos" className="p-6 bg-green-50 rounded-lg mt-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Wash your hands thoroughly before touching your tattoo</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Keep the tattoo clean and moisturized throughout healing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Wear loose, clean clothing over the tattooed area</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Sleep in positions that avoid pressure on your new tattoo</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Apply sunscreen (once healed) to protect from fading</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Contact us with any concerns during the healing process</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="donts" className="p-6 bg-red-50 rounded-lg mt-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Don't pick, scratch, or peel the scabs and flaking skin</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Don't submerge your tattoo in water (baths, pools, ocean)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Don't expose your fresh tattoo to direct sunlight</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Don't apply petroleum jelly, alcohol, or harsh products</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Don't wear tight or abrasive clothing over the area</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Don't exercise excessively or do activities that cause heavy sweating</span>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
          
          {/* Long-term Care */}
          <h2 className="text-2xl font-bold mb-6">Long-term Tattoo Care</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-16">
            <p className="text-gray-700 mb-4">
              Even after your tattoo is fully healed, ongoing care will help maintain its appearance for years to come:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-purple-700 mt-1">•</span>
                <span><strong>Sun Protection:</strong> Always apply SPF 30+ sunscreen when your tattoo will be exposed to the sun. UV rays are the leading cause of tattoo fading.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-700 mt-1">•</span>
                <span><strong>Moisturize:</strong> Keep your skin well-hydrated with regular moisturizer to maintain tattoo vibrancy.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-700 mt-1">•</span>
                <span><strong>Weight Maintenance:</strong> Significant weight changes can distort tattoos, particularly in areas that expand or contract with weight gain or loss.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-700 mt-1">•</span>
                <span><strong>Touch-ups:</strong> Even with perfect care, some tattoos may need touch-ups after several years. This is normal and helps maintain crisp lines and vibrant colors.</span>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="bg-purple-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold mb-3">Have Questions About Your Healing Tattoo?</h3>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              If you notice anything concerning during your healing process, don't hesitate to contact us. We're here to help ensure your tattoo heals perfectly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="gradient">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/faq">View FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}