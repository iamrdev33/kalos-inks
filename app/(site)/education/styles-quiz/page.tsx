"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { tattooStyles } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft, Share2 } from 'lucide-react';

// Quiz questions
const questions = [
  {
    id: 1,
    question: "What kind of imagery appeals to you most?",
    options: [
      { text: "Bold, iconic symbols like anchors, roses, and skulls", styles: ["traditional"] },
      { text: "Realistic portraits and detailed scenes", styles: ["realism"] },
      { text: "Intricate patterns and geometric shapes", styles: ["geometric", "blackwork"] },
      { text: "Flowing, painterly designs with vibrant colors", styles: ["watercolor"] },
      { text: "Cultural and symbolic imagery like dragons and koi fish", styles: ["japanese"] },
      { text: "Modern, minimalist designs", styles: ["geometric", "blackwork"] }
    ]
  },
  {
    id: 2,
    question: "What colors are you drawn to for your tattoo?",
    options: [
      { text: "Bold primary colors with black outlines", styles: ["traditional"] },
      { text: "Natural, skin-tone shades for realistic effect", styles: ["realism"] },
      { text: "Just black ink, no colors", styles: ["blackwork", "geometric"] },
      { text: "Soft, blended colors that fade into each other", styles: ["watercolor"] },
      { text: "Traditional Japanese color palette (red, blue, green, black)", styles: ["japanese"] },
      { text: "Minimal colors, focus on linework", styles: ["geometric"] }
    ]
  },
  {
    id: 3,
    question: "How important is symbolism or meaning in your tattoo?",
    options: [
      { text: "I value traditional tattoo symbols and their historic meanings", styles: ["traditional"] },
      { text: "I want to capture meaningful moments, people, or places exactly as they appear", styles: ["realism"] },
      { text: "I'm drawn to abstract patterns that have personal meaning", styles: ["geometric", "blackwork"] },
      { text: "I care more about artistic expression than specific symbols", styles: ["watercolor"] },
      { text: "I'm interested in the rich cultural symbolism of Japanese tattooing", styles: ["japanese"] },
      { text: "I prefer clean, straightforward designs with personal significance", styles: ["geometric"] }
    ]
  },
  {
    id: 4,
    question: "What kind of lines do you prefer in artwork?",
    options: [
      { text: "Bold, thick outlines that stand the test of time", styles: ["traditional"] },
      { text: "No visible outlines, just shading that creates the image", styles: ["realism"] },
      { text: "Sharp, precise lines forming patterns", styles: ["geometric", "blackwork"] },
      { text: "Soft edges that blend into the skin", styles: ["watercolor"] },
      { text: "Dynamic, flowing lines that create movement", styles: ["japanese"] },
      { text: "Clean, minimal linework", styles: ["geometric"] }
    ]
  },
  {
    id: 5,
    question: "How do you feel about tattoo aging and longevity?",
    options: [
      { text: "I want a design proven to hold up well over decades", styles: ["traditional"] },
      { text: "I understand detailed work may need touch-ups but value the realism", styles: ["realism"] },
      { text: "Black ink ages well, so I'm drawn to blackwork designs", styles: ["blackwork"] },
      { text: "I love the contemporary look of watercolor even if it might fade more", styles: ["watercolor"] },
      { text: "I appreciate traditional styles designed to last a lifetime", styles: ["japanese"] },
      { text: "I value clean designs that will remain legible as they age", styles: ["geometric"] }
    ]
  }
];

export default function StylesQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      calculateResult(newAnswers);
    }
  };
  
  const calculateResult = (finalAnswers: number[]) => {
    // Count style preferences
    const styleCounts: Record<string, number> = {};
    
    finalAnswers.forEach((answerIndex, questionIndex) => {
      const styles = questions[questionIndex].options[answerIndex].styles;
      styles.forEach(style => {
        styleCounts[style] = (styleCounts[style] || 0) + 1;
      });
    });
    
    // Find top style
    let topStyle = '';
    let maxCount = 0;
    
    Object.entries(styleCounts).forEach(([style, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topStyle = style;
      }
    });
    
    setResult(topStyle);
    setShowResult(true);
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setShowResult(false);
  };
  
  // Calculate progress percentage
  const progressPercentage = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100;
  
  const resultStyle = tattooStyles.find(style => style.id === result);
  
  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <SectionHeading 
          title="Find Your Tattoo Style" 
          subtitle="Take this quick quiz to discover which tattoo style best matches your aesthetic preferences."
          center
        />
        
        <div className="max-w-3xl mx-auto mt-12">
          {/* Progress bar */}
          <div className="mb-8">
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">
              Question {showResult ? questions.length : currentQuestion + 1} of {questions.length}
            </p>
          </div>
          
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg p-8 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-6">
                {questions[currentQuestion].question}
              </h2>
              
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-full text-left p-4 rounded-lg border-2 transition-all",
                      answers[currentQuestion] === index
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                    )}
                    onClick={() => handleAnswer(index)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                {currentQuestion > 0 ? (
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {answers[currentQuestion] !== undefined && currentQuestion < questions.length - 1 && (
                  <Button 
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    className="flex items-center gap-2"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-4">Your Perfect Tattoo Style:</h2>
                {resultStyle && (
                  <>
                    <h3 className="text-3xl font-bold text-purple-700 mb-6">
                      {resultStyle.name}
                    </h3>
                    
                    <div className="aspect-w-16 aspect-h-9 relative rounded-lg overflow-hidden mb-6">
                      <Image 
                        src={resultStyle.image}
                        alt={resultStyle.name}
                        className="object-cover"
                        fill
                      />
                    </div>
                    
                    <p className="text-gray-700 mb-6">
                      {resultStyle.description}
                    </p>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 mb-6">
                      <h4 className="font-semibold mb-2">Key Characteristics:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {getStyleCharacteristics(resultStyle.id).map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <Button onClick={resetQuiz} variant="outline">
                        Take Quiz Again
                      </Button>
                      
                      <div className="flex gap-3">
                        <Button asChild variant="outline" className="flex items-center gap-2">
                          <button>
                            <Share2 className="w-4 h-4" /> Share Result
                          </button>
                        </Button>
                        
                        <Button asChild>
                          <Link href="/booking">Book Consultation</Link>
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* More styles you might like */}
              <div className="border-t border-gray-200 p-8">
                <h3 className="text-xl font-bold mb-6">Other Styles You Might Like</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tattooStyles
                    .filter(style => style.id !== result)
                    .slice(0, 3)
                    .map(style => (
                      <div 
                        key={style.id}
                        className="rounded-lg overflow-hidden shadow-sm border border-gray-200"
                      >
                        <div className="aspect-w-1 aspect-h-1 relative">
                          <Image 
                            src={style.image}
                            alt={style.name}
                            className="object-cover"
                            fill
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-bold">{style.name}</h4>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to get style characteristics
function getStyleCharacteristics(styleId: string): string[] {
  switch (styleId) {
    case 'traditional':
      return [
        "Bold black outlines",
        "Limited but vibrant color palette",
        "Classic, iconic imagery",
        "High contrast",
        "Excellent longevity and aging"
      ];
    case 'realism':
      return [
        "Photorealistic detail",
        "Fine shading and texture",
        "3D appearance",
        "Natural color palette",
        "No outlines, relies on shading"
      ];
    case 'blackwork':
      return [
        "Exclusively black ink",
        "Strong contrast",
        "Various techniques from dotwork to solid black",
        "Geometric or organic patterns",
        "Strong graphic impact"
      ];
    case 'watercolor':
      return [
        "Paint-like appearance",
        "Flowing, blended colors",
        "Minimal or subtle outlines",
        "Soft edges and splashes",
        "Contemporary, artistic feel"
      ];
    case 'japanese':
      return [
        "Traditional Japanese imagery (koi, dragons, cherry blossoms)",
        "Wave-like backgrounds",
        "Bold outlines with flat colors",
        "Harmonious full-body compositions",
        "Rich cultural symbolism"
      ];
    case 'geometric':
      return [
        "Precise, clean lines",
        "Mathematical patterns",
        "Optical illusions",
        "Symmetry and balance",
        "Minimalist approach"
      ];
    default:
      return [];
  }
}