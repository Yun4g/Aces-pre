'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Section2: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative py-16 px-4 sm:px-8 lg:px-20 text-center  lg::mt-[400px] overflow-hidden">
      {/* HEADINGS */}
      <div className="mb-6">
        <p className="text-sm font-bold uppercase text-blue-500 tracking-widest">PROCESS</p>
        <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">HOW IT WORKS</h2>
      </div>

      {/* GET STARTED BUTTON */}
      <div className="mb-8">
        <button
          onClick={() => router.push('/signup')}
          className="mt-6 font-medium bg-[#005A9C] text-white w-[160px] sm:w-[172px] h-[48px] sm:h-[54px] text-sm sm:text-base rounded-xl"
        >
          Get Started
        </button>
      </div>

      {/* WAVE SVG BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <svg
          viewBox="0 0 1200 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 300 C 200 100, 400 100, 600 300 C 800 500, 1000 500, 1200 300"
            stroke="#cbd5e1"
            strokeWidth="3"
            className="animate-wave"
          />
        </svg>
      </div>

      {/* STEPS CONTAINER */}
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
        {[
          {
            id: 1,
            title: 'Districts Staffs',
            desc: 'Party we years to order allow asked of. We so opinion friends me message as delight.',
          },
          {
            id: 2,
            title: 'Project Discovery Call',
            desc: 'His defective nor convinced residence own. Connection has put impossible own apartments boisterous.',
          },
          {
            id: 3,
            title: 'Project Discovery Call',
            desc: 'Party we years to order allow asked of. So opinion friends me message debitsiute.',
          },
          {
            id: 4,
            title: 'Project Discovery Call',
            desc: 'From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly.',
          },
        ].map((step) => (
          <div
            key={step.id}
            className="relative p-6 bg-white rounded-lg shadow-md transition hover:shadow-xl"
          >
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
              {step.id}
            </div>
            <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section2;
