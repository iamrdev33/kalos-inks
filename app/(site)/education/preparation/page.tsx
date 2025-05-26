"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { AlertCircle, Check, Clock, ThumbsUp, Calendar } from 'lucide-react';

const checklistItems = [
  {
    id: "week-before",
    title: "Week Before",
    icon: Calendar,
    color: "bg-blue-100 text-blue-700",
    items: [
      { id: "hydrate-pre", label: "Stay well-hydrated (increases skin elasticity)" },
      { id: "moisturize-pre", label: "Moisturize the area to be tattooed daily" },
      { id: "avoid-sun", label: "Avoid sun exposure and tanning beds" },
      { id: "avoid-alcohol-pre", label: "Avoid excessive alcohol consumption" },
      { id: "shave-check", label: "Check if you need to shave the area (we'll handle this if needed)" }
    ]
  },
  {
    id: "day-before",
    title: "Day Before",
    icon: Clock,
    color: "bg-purple-100 text-purple-700",
    items: [
      { id: "good-sleep", label: "Get a good night's sleep (8+ hours if possible)" },
      { id: "finalize-design", label: "Finalize any design questions with your artist" },
      { id: "no-alcohol", label: "Avoid alcohol completely (thins blood and affects healing)" },
      { id: "no-aspirin", label: "Avoid aspirin and blood thinners (if medically safe)" },
      { id: "plan-outfit", label: "Plan comfortable, loose-fitting outfit that allows access to tattoo area" }
    ]
  },
  {
    id: "day-of",
    title: "Day of Appointment",
    icon: ThumbsUp,
    color: "bg-green-100 text-green-700",
    items: [
      { id: "eat-meal", label: "Eat a substantial meal 1-2 hours before your appointment" },
      { id: "shower", label: "Shower and clean the area to be tattooed" },
      { id: "no-lotion", label: "Don't apply lotion, oils, or sunscreen to the tattoo area" },
      { id: "bring-id", label: "Bring valid ID (required for all clients)" },
      { id: "bring-payment", label: "Bring method of payment (cash, card, or digital payment)" },
      { id: "bring-snacks", label: "Bring snacks and water for longer sessions" },
      { id: "entertainment", label: "Bring headphones/entertainment for longer sessions" }
    ]
  }
];

const importantNotes = [
  {
    title: "Medical Conditions",
    content: "Inform your artist about any medical conditions that might affect the tattooing process or healing, such as diabetes, heart conditions, epilepsy, or autoimmune disorders."
  },
  {
    title: "Medications",
    content: "Let your artist know if you're taking any medications that might affect bleeding or healing, such as blood thinners, accutane, steroids, or immunosuppressants."
  },
  {
    title: "Allergies",
    content: "Inform your artist about any allergies, especially to latex, adhesives, soaps, or specific metals that might be in tattoo ink."
  },
  {
    title: "Skin Conditions",
    content: "If you have any skin conditions like eczema, psoriasis, or dermatitis, discuss this with your artist as it may affect the tattooing process and healing."
  },
  {
    title: "Pregnancy",
    content: "We do not tattoo pregnant or breastfeeding individuals due to potential risks to mother and child."
  }
];

export default function PreparationChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  const handleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Calculate progress
  const totalItems = checklistItems.reduce((acc, section) => acc + section.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;
  
  // Progress styling
  const getProgressColor = () => {
    if (progress < 33) return "bg-red-500";
    if (progress < 66) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <SectionHeading 
          title="Tattoo Preparation Checklist" 
          subtitle="Follow these steps to ensure you're fully prepared for your tattoo appointment."
          center
        />
        
        <div className="max-w-4xl mx-auto mt-12">
          {/* Intro */}
          <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm mb-12">
            <h3 className="text-xl font-bold mb-4">Be Prepared for the Best Experience</h3>
            <p className="text-gray-700 mb-6">
              Proper preparation can make a huge difference in both your comfort during the tattooing process and the quality of the final result. Use this checklist to make sure you're ready for your appointment.
            </p>
            
            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Your preparation progress</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full transition-all duration-500 ${getProgressColor()}`} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              {progress === 100 && (
                <p className="text-green-600 text-sm mt-2 flex items-center">
                  <Check className="w-4 h-4 mr-1" /> You're all set for your appointment!
                </p>
              )}
            </div>
          </div>
          
          {/* Checklist Sections */}
          <div className="space-y-12 mb-16">
            {checklistItems.map((section) => (
              <div key={section.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <div className={cn("p-4 flex items-center gap-3", section.color)}>
                  <section.icon className="w-5 h-5" />
                  <h3 className="text-lg font-bold">{section.title}</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div key={item.id} className="flex items-start space-x-3">
                        <Checkbox 
                          id={item.id} 
                          checked={!!checkedItems[item.id]} 
                          onCheckedChange={() => handleCheck(item.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label 
                            htmlFor={item.id} 
                            className={cn(
                              "text-base cursor-pointer",
                              checkedItems[item.id] ? "line-through text-gray-400" : "text-gray-700"
                            )}
                          >
                            {item.label}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Important Notes */}
          <div className="bg-red-50 rounded-lg p-6 border border-red-200 mb-16">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="text-xl font-bold text-red-800">Important Health Considerations</h3>
            </div>
            
            <div className="space-y-4">
              {importantNotes.map((note, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-red-700">{note.title}</h4>
                  <p className="text-gray-700">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* What to Bring Visualization */}
          <h2 className="text-2xl font-bold mb-6">What to Bring</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <div className="aspect-w-3 aspect-h-2 relative">
                <Image 
                  src="https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="ID and payment"
                  className="object-cover"
                  fill
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">Essentials</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Valid ID (driver's license, passport)</li>
                  <li>• Payment method (cash preferred)</li>
                  <li>• Appointment confirmation details</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <div className="aspect-w-3 aspect-h-2 relative">
                <Image 
                  src="https://images.pexels.com/photos/4050990/pexels-photo-4050990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Snacks and refreshments"
                  className="object-cover"
                  fill
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">For Comfort</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Water and non-messy snacks</li>
                  <li>• Comfortable, loose-fitting clothing</li>
                  <li>• Phone charger for longer sessions</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <div className="aspect-w-3 aspect-h-2 relative">
                <Image 
                  src="https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Entertainment"
                  className="object-cover"
                  fill
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">Entertainment</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Headphones</li>
                  <li>• Music/podcasts/audiobooks</li>
                  <li>• Entertainment tablet or book</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Additional Tips */}
          <h2 className="text-2xl font-bold mb-6">Day-of Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-800 mb-3">Do's</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Arrive 10-15 minutes early to complete paperwork</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Eat a full meal and stay hydrated before your appointment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Wear appropriate clothing that allows easy access to the tattoo area</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Bring reference photos or ideas to discuss with your artist</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Ask questions if you have concerns before starting</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="font-bold text-red-800 mb-3">Don'ts</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Don't consume alcohol or recreational drugs before your appointment</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Don't bring too many friends (one support person maximum)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Don't apply lotion, oil, or sunscreen to the area to be tattooed</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Don't arrive exhausted or hungry</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Don't rush the process or make last-minute design changes</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-purple-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold mb-3">Ready to Get Tattooed?</h3>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              Now that you're prepared, take the next step and book your appointment with us. We look forward to creating something beautiful for you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="gradient">
                <Link href="/booking">Book Your Appointment</Link>
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