'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const Offerings = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => setHeaderVisible(true), 100);
          setTimeout(() => setCardsVisible(true), 600);
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
  }, []);

  const offeringsList = [
    {
      title: 'Workout Tracking',
      description: 'Track your exercises, sets, reps, and progress over time.',
      image: '/images/lift.png',
    },
    {
      title: 'Run Tracking',
      description: 'Monitor your running distance, pace, and routes.',
      image: '/images/run.png',
    },
    {
      title: 'Nutrition Tracking',
      description: 'Log your meals and track your daily nutritional intake.',
      image: '/images/eat.png',
    },
    {
      title: 'Sleep Tracking',
      description: 'Record and analyze your sleep patterns and quality.',
      image: '/images/sleep.png',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center min-h-screen text-[#ffffff] px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1c0f0a] via-[#2d1a14] to-[#000000] py-32"
    >
      <div className="max-w-7xl w-full">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-['Libre_Baskerville'] transform transition-all duration-1000 ${
              headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            What We Offer
          </h2>
          <p
            className={`mt-4 text-lg sm:text-xl text-[#d1d5db] font-['Libre_Baskerville'] max-w-3xl mx-auto transform transition-all duration-1000 ${
              headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            We aim to help you achieve your fitness goals through comprehensive tracking and
            monitoring. Our suite of services covers every aspect of your wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {offeringsList.map((offering, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-[#3c2820] to-[#2d1a14] rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-1000 
                       hover:from-[#4c3830] hover:to-[#3d2a24] border border-[#c4634d30] transform overflow-hidden group
                       ${cardsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <div className="relative w-full h-32 mb-4 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#3c2820] to-[#2d1a14] transition-all duration-1000 group-hover:from-[#4c3830] group-hover:to-[#3d2a24]">
                <Image
                  src={offering.image}
                  alt={offering.title}
                  width={80}
                  height={80}
                  className="w-20 h-20"
                  priority
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-['Libre_Baskerville'] text-[#ffedd5]">
                {offering.title}
              </h3>
              <p className="text-[#d1d5db] font-['Libre_Baskerville']">{offering.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offerings;
