'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const HomeSignup = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisible(true);
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

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center min-h-[70vh] text-[#ffffff] px-4 sm:px-6 lg:px-8 bg-[#1c0f0a] rounded-3xl pb-32"
    >
      <div
        className={`max-w-4xl text-center transform transition-all duration-1000 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 font-['Libre_Baskerville']">
          Start Your Fitness Journey Today
        </h2>
        <p className="text-lg sm:text-lg lg:text-2xl text-[#d1d5db] mb-10 font-['Libre_Baskerville']">
          Join our community because your body is a temple.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="px-10 py-4 bg-[#ea580c] text-white rounded-lg font-['Libre_Baskerville'] text-xl lg:text-2xl hover:bg-[#f97316] transition-colors duration-300"
          >
            Sign Up Now
          </Link>
          <Link
            href="/login"
            className="px-10 py-4 border border-[#ea580c] text-[#ea580c] rounded-lg font-['Libre_Baskerville'] text-xl lg:text-2xl hover:bg-[#ea580c] hover:text-white transition-all duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeSignup;
