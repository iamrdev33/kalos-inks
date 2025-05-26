"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Pain levels data
const painLevels = [
  { level: 1, color: "bg-green-500", label: "Low Pain" },
  { level: 2, color: "bg-lime-500", label: "Mild Pain" },
  { level: 3, color: "bg-yellow-500", label: "Moderate Pain" },
  { level: 4, color: "bg-orange-500", label: "High Pain" },
  { level: 5, color: "bg-red-500", label: "Severe Pain" }
];

// Body parts data with pain levels
const bodyParts = [
  { id: "upperArm", name: "Upper Arm", level: 2, coordinates: { x: 25, y: 35, width: 8 } },
  { id: "forearm", name: "Forearm", level: 2, coordinates: { x: 22, y: 45, width: 8 } },
  { id: "innerArm", name: "Inner Arm", level: 4, coordinates: { x: 30, y: 40, width: 8 } },
  { id: "wrist", name: "Wrist", level: 3, coordinates: { x: 20, y: 55, width: 8 } },
  { id: "hand", name: "Hand", level: 4, coordinates: { x: 20, y: 62, width: 8 } },
  { id: "chest", name: "Chest", level: 3, coordinates: { x: 50, y: 30, width: 14 } },
  { id: "sternum", name: "Sternum", level: 5, coordinates: { x: 50, y: 35, width: 8 } },
  { id: "ribs", name: "Ribs", level: 5, coordinates: { x: 60, y: 40, width: 8 } },
  { id: "stomach", name: "Stomach", level: 3, coordinates: { x: 50, y: 45, width: 10 } },
  { id: "lowerBack", name: "Lower Back", level: 3, coordinates: { x: 77, y: 42, width: 10 } },
  { id: "spine", name: "Spine", level: 4, coordinates: { x: 77, y: 30, width: 8 } },
  { id: "shoulder", name: "Shoulder", level: 2, coordinates: { x: 30, y: 28, width: 10 } },
  { id: "upperLeg", name: "Upper Leg", level: 2, coordinates: { x: 45, y: 55, width: 10 } },
  { id: "knee", name: "Knee", level: 4, coordinates: { x: 45, y: 65, width: 8 } },
  { id: "lowerLeg", name: "Lower Leg", level: 3, coordinates: { x: 45, y: 75, width: 8 } },
  { id: "ankle", name: "Ankle", level: 4, coordinates: { x: 45, y: 85, width: 8 } },
  { id: "foot", name: "Foot", level: 5, coordinates: { x: 45, y: 92, width: 8 } },
  { id: "neck", name: "Neck", level: 4, coordinates: { x: 50, y: 20, width: 8 } },
  { id: "head", name: "Head", level: 5, coordinates: { x: 50, y: 10, width: 10 } },
  { id: "face", name: "Face", level: 5, coordinates: { x: 50, y: 15, width: 8 } },
  { id: "hip", name: "Hip", level: 3, coordinates: { x: 60, y: 55, width: 8 } },
  { id: "buttocks", name: "Buttocks", level: 3, coordinates: { x: 77, y: 55, width: 10 } },
];

export default function PainChart() {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [view, setView] = useState<'front' | 'back'>('front');
  
  const handlePartClick = (partId: string) => {
    setSelectedPart(partId === selectedPart ? null : partId);
  };
  
  const selectedPartDetails = bodyParts.find(part => part.id === selectedPart);
  
  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <SectionHeading 
          title="Tattoo Pain Chart" 
          subtitle="An interactive guide to understanding pain levels across different body parts."
          center
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Pain Level Legend */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold mb-4">Pain Levels</h3>
              <div className="space-y-4 mb-8">
                {painLevels.map((level) => (
                  <div key={level.level} className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-md", level.color)}></div>
                    <div>
                      <p className="font-medium">{level.label}</p>
                      <p className="text-sm text-gray-500">Level {level.level}/5</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedPartDetails ? (
                <div className="bg-gray-50 p-4 rounded-lg mt-6">
                  <h3 className="text-lg font-bold mb-2">{selectedPartDetails.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={cn(
                      "w-4 h-4 rounded-sm",
                      selectedPartDetails.level === 1 && "bg-green-500",
                      selectedPartDetails.level === 2 && "bg-lime-500",
                      selectedPartDetails.level === 3 && "bg-yellow-500",
                      selectedPartDetails.level === 4 && "bg-orange-500",
                      selectedPartDetails.level === 5 && "bg-red-500",
                    )}></div>
                    <p className="font-medium">
                      {painLevels.find(l => l.level === selectedPartDetails.level)?.label}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {getPainDescription(selectedPartDetails.level, selectedPartDetails.name)}
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg mt-6">
                  <p className="text-gray-600">Click on a body part to view pain level details.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Interactive Body Model */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 text-center">
              <div className="flex justify-center gap-4 mb-6">
                <Button 
                  variant={view === 'front' ? 'default' : 'outline'} 
                  onClick={() => setView('front')}
                >
                  Front View
                </Button>
                <Button 
                  variant={view === 'back' ? 'default' : 'outline'} 
                  onClick={() => setView('back')}
                >
                  Back View
                </Button>
              </div>
              
              <div className="relative">
                <div className="mx-auto relative h-[600px] w-full max-w-[300px]">
                  <Image 
                    src={view === 'front' 
                      ? "https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&w=600" 
                      : "https://images.pexels.com/photos/1486064/pexels-photo-1486064.jpeg?auto=compress&cs=tinysrgb&w=600"}
                    alt={`Human body ${view} view silhouette`}
                    className="opacity-20"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                  
                  {/* Pain points */}
                  {bodyParts
                    .filter(part => 
                      (view === 'front' && !['lowerBack', 'spine', 'buttocks'].includes(part.id)) ||
                      (view === 'back' && !['chest', 'sternum', 'stomach', 'face'].includes(part.id))
                    )
                    .map((part) => (
                      <motion.button
                        key={part.id}
                        className={cn(
                          "absolute rounded-full hover:scale-110 transition-transform",
                          selectedPart === part.id ? "ring-2 ring-purple-700 ring-offset-2" : "",
                          part.level === 1 && "bg-green-500/80",
                          part.level === 2 && "bg-lime-500/80",
                          part.level === 3 && "bg-yellow-500/80",
                          part.level === 4 && "bg-orange-500/80",
                          part.level === 5 && "bg-red-500/80",
                        )}
                        style={{
                          left: `${part.coordinates.x}%`,
                          top: `${part.coordinates.y}%`,
                          width: `${part.coordinates.width}%`,
                          height: `${part.coordinates.width * 1.2}%`
                        }}
                        onClick={() => handlePartClick(part.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      />
                    ))
                  }
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                Click on a colored area to see details about pain levels for that body part.
              </p>
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="order-3">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold mb-4">About Pain Levels</h3>
              <div className="prose max-w-none text-gray-700">
                <p>
                  Pain during tattooing varies widely based on the area being tattooed and individual pain tolerance. Areas with thinner skin, more nerve endings, or directly over bone tend to be more painful.
                </p>
                <h4 className="text-lg font-semibold mt-6 mb-2">Factors Affecting Pain</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Skin thickness</li>
                  <li>Proximity to bone</li>
                  <li>Concentration of nerve endings</li>
                  <li>Individual pain tolerance</li>
                  <li>Tattoo size and complexity</li>
                  <li>Session duration</li>
                </ul>
                <h4 className="text-lg font-semibold mt-6 mb-2">Pain Management</h4>
                <p>
                  We offer several options to help manage discomfort during your tattoo session:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Topical numbing creams (for certain areas)</li>
                  <li>Breaks during longer sessions</li>
                  <li>Distraction techniques</li>
                  <li>Proper eating and hydration before your appointment</li>
                </ul>
                <p className="mt-6">
                  Remember: Pain is temporary, but your beautiful tattoo is permanent!
                </p>
              </div>
              
              <div className="mt-8">
                <Button asChild>
                  <Link href="/booking">Book Your Session</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get pain descriptions
function getPainDescription(level: number, bodyPart: string): string {
  const descriptions = {
    1: `The ${bodyPart} area typically experiences minimal discomfort during tattooing. The skin here is thicker with fewer nerve endings, making it one of the least painful locations.`,
    2: `Most people experience only mild discomfort when getting tattooed on the ${bodyPart}. This area has moderate skin thickness and relatively few nerve endings.`,
    3: `The ${bodyPart} has a moderate pain level. While not the most painful area, you'll definitely feel the needle. The sensation is often described as uncomfortable but manageable.`,
    4: `Tattooing the ${bodyPart} can be quite painful for most people. This area has thinner skin, more nerve endings, or is closer to bone, resulting in increased sensitivity.`,
    5: `The ${bodyPart} is among the most painful areas to tattoo. With thin skin, numerous nerve endings, and often little fat or muscle to cushion the needle, expect significant discomfort.`
  };
  
  return descriptions[level as keyof typeof descriptions] || "Pain level information unavailable.";
}