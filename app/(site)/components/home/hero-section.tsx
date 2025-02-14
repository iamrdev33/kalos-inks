'use client';

import React from 'react'
import '../home/home.css'
import GenericButton from '../generic-button';

const handleButtonClick = () => {
  console.log('Button clicked');
};

export default function HeroSection() {
  return (
    <header className=" h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bor3y.png')" }}>
      <div className="absolute inset-0 bg-grey opacity-45" />

      <div className="relative flex flex-col items-center justify-center h-full ">
        <h1 className="text-6xl main-title">Unique. Timeless. Yours.</h1>
        <p className="mt-4 text-xl text-bold max-w-2xl text-center">
          Book your session with top artists in Egypt. Custom designs, high-quality ink, and expert care.
        </p>
        <GenericButton
          name='Book Your Appointment'
          onClick={handleButtonClick}
        />
      </div>
    </header>
  );
};

