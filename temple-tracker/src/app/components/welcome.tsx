'use client';

import { useEffect, useState } from 'react';

export default function Welcome() {
  const [titleVisible, setTitleVisible] = useState(false);
  const [lineVisible, setLineVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Stagger the animations
    setTimeout(() => setTitleVisible(true), 0);
    setTimeout(() => setLineVisible(true), 500);
    setTimeout(() => setTextVisible(true), 1000);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-[#ffffff] px-4 sm:px-6 lg:px-8">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
      >
        <source src="/videos/Temple_Video.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 max-w-full text-center">
        <h1
          className={`text-6xl sm:text-7xl lg:text-8xl font-bold mb-2 pb-4 font-['Libre_Baskerville'] transform transition-all duration-1000 ${
            titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Welcome to Temple Tracker
        </h1>
        <div
          className={`h-0.5 bg-[#ea580c] mx-auto transform transition-all duration-1000 ${
            lineVisible ? 'w-full' : 'w-0'
          }`}
        ></div>
        <div
          className={`transform transition-all duration-1000 ${
            textVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="text-lg sm:text-xl lg:text-2xl mt-6 mb-8 font-['Libre_Baskerville']">
            Your personal fitness journey starts here. Track your workouts, runs, and nutrition
            goals all in one place.
          </p>
          <p className="text-lg sm:text-xl opacity-100 font-['Libre_Baskerville']">
            Login to get started!
          </p>
        </div>
      </div>
    </section>
  );
}
