'use client';

import React from 'react';
import { FaQuoteLeft, FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';
import Image from 'next/image';

const SectionFive: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-12 xl:px-24 py-20 text-center">
      {/* Header */}
      <div className="mb-12">
        <p className="text-[#005A9C] text-sm sm:text-base font-bold">Testimonials</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-2">
          Check what our clients are saying
        </h1>
      </div>

      {/* Testimonial Content */}
      <section className="flex justify-center w-full">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4 sm:px-6">
          {/* Left Side - Image */}
          <div className="relative flex justify-center items-center w-full h-full">
            {/* Top left logo box */}
            <div className="absolute top-0 left-0 w-20 h-20 flex items-center justify-center">
              <Image
                src="/assest/elipses.png"
                alt="Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            {/* Image */}
            <div className="relative z-10 w-[70%] max-w-xs sm:max-w-sm md:max-w-md">
              <Image
                src="/assest/landGirl.png"
                alt="Profile"
                width={300}
                height={300}
                className="rounded-lg w-full h-auto max-h-[300px] object-cover"
              />
            </div>

            {/* Bottom Right Accent */}
            <div className="absolute bottom-0 right-0 w-[60px] h-[60px] bg-cyan-300 rotate-90 rounded-tr-full" />

            {/* Carousel Arrows */}
            <button className="absolute left-4 sm:left-10 z-20 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
              <FaArrowLeft size={16} />
            </button>
            <button className="absolute right-4 sm:right-10 z-20 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
              <FaArrowRight size={16} />
            </button>
          </div>

          {/* Right Side - Testimonial Text */}
          <div className="text-gray-800 text-left px-2">
            <FaQuoteLeft size={28} className="text-red-400 mb-4" />
            <div className="flex mb-4 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="text-base sm:text-lg md:text-xl font-medium text-[#898A8C] leading-relaxed mb-6">
              Is be upon sang fond must shew. Really boy law county she unable her sister. Feet you off its like like six. Among sex are leave law built now.
            </p>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="font-bold text-lg sm:text-xl">AR Shakir</h3>
                <p className="text-sm sm:text-base text-gray-500 font-medium">
                  CEO GetNextDesign
                </p>
              </div>
              <Image
                src="/assest/segment.png"
                alt="Segment"
                width={100}
                height={24}
                className="h-6 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SectionFive;
