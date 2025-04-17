'use client';

import React from 'react';

const TwoCardSection: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-12">
      <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
        {/* Card 1 */}
        <div className="flex flex-col items-center text-center bg-[#F8F9FD] shadow-md rounded-2xl px-6 sm:px-8 py-10 w-full max-w-[500px]">
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 leading-snug">
              Offend belong promote provision
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Wise busy past both park when an ye no. Nay likely her length sooner thrown sex lively income.
            </p>
          </div>
          <button className="bg-[#005A9C] text-white text-base font-medium px-6 py-3 rounded-xl">
            Read More
          </button>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center text-center bg-[#F8F9FD] shadow-md rounded-2xl px-6 sm:px-8 py-10 w-full max-w-[500px]">
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 leading-snug">
              Consulted ourselves it blessing welcome
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              The expense windows adapted sir. Wrong widen drawn ample eat off doors money.
            </p>
          </div>
          <button className="bg-[#005A9C] text-white text-base font-medium px-6 py-3 rounded-xl">
            Read More
          </button>
        </div>
      </div>
    </section>
  );
};

export default TwoCardSection;
