"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, UploadCloud, Check, ChevronRight, ChevronLeft } from "lucide-react";
import { services } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const steps = [
  { id: 1, name: "Service" },
  { id: 2, name: "Details" },
  { id: 3, name: "Date" },
  { id: 4, name: "Contact" },
  { id: 5, name: "Confirm" },
];

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    details: "",
    referenceImage: null as File | null,
    date: new Date(),
    time: "",
    name: "",
    email: "",
    phone: "",
    hearAbout: "",
  });
  
  const progress = (currentStep / steps.length) * 100;
  
  const handleServiceSelect = (serviceId: string) => {
    setFormData({ ...formData, service: serviceId });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData({ ...formData, date });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, referenceImage: e.target.files[0] });
    }
  };
  
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the data to a server
    console.log(formData);
    // Go to confirmation step
    nextStep();
  };
  
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.service !== "";
      case 2:
        return formData.details.length > 10;
      case 3:
        return formData.date && formData.time !== "";
      case 4:
        return (
          formData.name !== "" && 
          formData.email !== "" && 
          formData.phone !== ""
        );
      default:
        return true;
    }
  };
  
  // Time slots
  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Choose a Service</h2>
            <p className="text-gray-600">
              Select the type of tattoo service you're interested in.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={cn(
                    "border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md",
                    formData.service === service.id
                      ? "border-purple-500 shadow-lg"
                      : "border-gray-200"
                  )}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.title}
                      className="object-cover"
                      fill
                    />
                    {formData.service === service.id && (
                      <div className="absolute top-2 right-2 bg-purple-700 text-white p-1 rounded-full">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{service.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {service.description}
                    </p>
                    <p className="text-purple-700 font-semibold">
                      From ${service.minPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Tattoo Details</h2>
            <p className="text-gray-600">
              Tell us about the tattoo you want. The more details, the better we can prepare.
            </p>
            
            <div className="space-y-6 mt-8">
              <div>
                <Label htmlFor="details">Describe your tattoo idea</Label>
                <Textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="Include size, placement, style, and any other important details..."
                  className="h-40"
                />
              </div>
              
              <div>
                <Label htmlFor="reference">Upload reference images (optional)</Label>
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors",
                    formData.referenceImage ? "border-purple-300" : "border-gray-300"
                  )}
                  onClick={() => document.getElementById("reference")?.click()}
                >
                  <input
                    type="file"
                    id="reference"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  
                  {formData.referenceImage ? (
                    <div className="space-y-2">
                      <div className="w-16 h-16 rounded bg-purple-100 flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8 text-purple-700" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {formData.referenceImage.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Click to change file
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center mx-auto">
                        <UploadCloud className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        Click to upload reference images
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Choose Date & Time</h2>
            <p className="text-gray-600">
              Select your preferred date and time slot. We'll confirm availability.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <Label>Select Date</Label>
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={handleDateSelect}
                    disabled={(date) => 
                      date < new Date() || 
                      date.getDay() === 0 || // Sunday
                      date.getDay() === 6    // Saturday
                    }
                    className="rounded-md border"
                  />
                </div>
              </div>
              
              <div>
                <Label>Select Time</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={cn(
                        "py-3 px-4 border rounded-md text-sm transition-colors",
                        formData.time === time
                          ? "bg-purple-700 text-white border-purple-700"
                          : "border-gray-300 hover:border-purple-300 hover:bg-purple-50"
                      )}
                      onClick={() => setFormData({ ...formData, time })}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Your Selection</h3>
                  {formData.date && formData.time ? (
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
                      <p className="font-medium text-purple-800">
                        {format(formData.date, "MMMM d, yyyy")} at {formData.time}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">
                      Please select a date and time
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Information</h2>
            <p className="text-gray-600">
              Please provide your contact details so we can confirm your appointment.
            </p>
            
            <div className="space-y-6 mt-8">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                />
              </div>
              
              <div>
                <Label htmlFor="hearAbout">How did you hear about us?</Label>
                <select
                  id="hearAbout"
                  name="hearAbout"
                  value={formData.hearAbout}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Please select</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="google">Google</option>
                  <option value="friend">Friend</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold">Booking Submitted!</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Thanks for your booking request. We'll review your information and get back to you within 24-48 hours to confirm your appointment.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto mt-8">
              <h3 className="font-semibold mb-4 text-left">Booking Summary</h3>
              
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-500">Service:</span>
                  <span className="font-medium">
                    {services.find(s => s.id === formData.service)?.title || ""}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Date & Time:</span>
                  <span className="font-medium">
                    {format(formData.date, "MMM d, yyyy")} at {formData.time}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Name:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                
                <div className="border-t border-gray-200 my-3"></div>
                
                <p className="text-sm text-gray-500">
                  A confirmation email has been sent to {formData.email}.
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <Button asChild variant="outline">
                <a href="/">Return to Home</a>
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-5xl">
        <SectionHeading 
          title="Book Your Appointment" 
          subtitle="Follow the steps below to schedule your tattoo consultation or session."
          center
        />
        
        {/* Progress */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative mb-6">
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex justify-between">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={cn(
                  "flex flex-col items-center",
                  currentStep >= step.id ? "text-purple-700" : "text-gray-400"
                )}
              >
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mb-2",
                    currentStep > step.id 
                      ? "bg-purple-700 text-white" 
                      : currentStep === step.id 
                        ? "bg-purple-100 text-purple-700 border-2 border-purple-700" 
                        : "bg-gray-100 text-gray-400"
                  )}
                >
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span className="text-xs hidden md:block">{step.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit}>
              {renderStep()}
              
              {/* Navigation */}
              {currentStep < 5 && (
                <div className="flex justify-between mt-12">
                  {currentStep > 1 ? (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={prevStep}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  {currentStep < 4 ? (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="flex items-center gap-1"
                      disabled={!isStepValid()}
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    currentStep === 4 && (
                      <Button 
                        type="submit" 
                        variant="gradient"
                        disabled={!isStepValid()}
                      >
                        Submit Booking
                      </Button>
                    )
                  )}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}