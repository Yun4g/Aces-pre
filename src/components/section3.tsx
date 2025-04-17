'use client';

import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import TwoCardSection from './section4';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


interface CardType {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Section3: React.FC = () => {
    const router = useRouter();
  const cards: CardType[] = [
    {
      id: 1,
      title: 'Offending belonging',
      description:
        'Letter of on become he tended active enable to. Vicinity relation sensible sociable surprise screened no up as.',
      image: '/assest/cup.png',  // Fixed the image path
    },
    {
      id: 2,
      title: 'Promotion & provision',
      description:
        'Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address.',
      image: '/assest/flower.png',  // Fixed the image path
    },
    {
      id: 3,
      title: 'Blessing application',
      description:
        'Ham windows sixteen who inquiry fortune demands. Is be upon sang fond must shew. Really boy law county she unable her sister.',
      image: '/assest/star.png',  // Fixed the image path
    },
  ];

  return (
    <section className="relative w-full">
      {/* Hero Section with Background */}
      <div className="relative w-full">
        <Image 
          width={1920}
          height={1080}
          src="/assest/vectorBendBackground.png" // Fixed image path
          className="w-full h-auto object-cover"
          alt="Decorative background"
          loading="lazy"
        />

        {/* Hero Content Overlay */}
        <div className="absolute top-1/2 left-1/2 w-full transform -translate-x-1/2 -translate-y-1/2 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto rounded-xl overflow-hidden">
            <div
              className="relative bg-cover bg-center bg-no-repeat aspect-[16/9] flex items-center justify-center"
              style={{
                backgroundImage: "url('/assest/bgHeroAccess.png')",
              }}
            >
              {/* Dark overlay */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
              ></div>

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-10 text-white text-center max-w-2xl">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
                  Push your product to next level.
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-6">
                  End-to-end payments and financial management in a single solution. Meet
                  the right platform to help realize.
                </p>
                <button    onClick={() => router.push('/signup')} className="bg-[#005A9C] hover:bg-[#004a84] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
            We help your business grow faster.
          </h2>
          <p className="text-[#64607D] text-base sm:text-lg max-w-xl mx-auto mb-12">
            Why kept very ever home mrs. Considered sympathize ten uncommonly occasional
            assistance sufficient.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  className="h-9 w-auto mb-6 mx-auto"
                  width={100}  // Add width for proper rendering
                  height={100} // Add height for proper rendering
                  loading="lazy"
                />
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{card.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4">{card.description}</p>
                <button className="text-[#005A9C] font-semibold flex items-center justify-center gap-2">
                  Read More <FaArrowRight className="inline" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Card Section */}
      <div className="pb-16 px-4 sm:px-6 md:px-12">
        <TwoCardSection />
      </div>
    </section>
  );
};

export default Section3;
