'use client';

import React, { useEffect, useState, useRef } from 'react';

const AIFeatures = () => {
  const [mounted, setMounted] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => setHeaderVisible(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  // Initial state for server-side rendering
  const initialHeaderClass = mounted ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100';

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen text-white px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/Ai_Video.mov" type="video/mp4" />
      </video>

      {/* Overlay to ensure text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl w-full">
        <div className="text-center">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-['Libre_Baskerville'] transform transition-all duration-1000 ${
              headerVisible ? 'translate-y-0 opacity-100' : initialHeaderClass
            }`}
          >
            AI-Powered Wellness
          </h2>
          <p
            className={`mt-4 text-lg sm:text-xl text-gray-200 font-['Libre_Baskerville'] max-w-3xl mx-auto transform transition-all duration-1000 ${
              headerVisible ? 'translate-y-0 opacity-100' : initialHeaderClass
            }`}
          >
            Experience personalized fitness guidance powered by advanced artificial intelligence.
            Our AI adapts to your unique journey, providing smart insights and recommendations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;