'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const HeroSection = () => {
  const router = useRouter();


  return (
    <div className=" md:overflow-hidden lg:h-[90vh] ">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row   h-full w-full px-6 md:ps-12 lg:ps-24 py-12">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 h-full lg:pt-24">
      
          <p className="text-3xl sm:text-5xl lg:text-[68px] font-semibold mt-4 leading-tight">
             Student Referral
          </p>
          <p className="text-3xl sm:text-5xl lg:text-[68px] font-semibold mt-2 leading-tight">
             Process
          </p>

          <p className="text-[#898A8C] text-base md:text-lg font-normal mt-4">
            Our automated workflow simplifies identifying and assisting students
            requiring special services. Ensure seamless communication between
            district staff, pupil services, and school programs.
          </p>

          {/* Register Box */}
          <div className="mt-6 shadow-2xl shadow-slate-400 bg-white w-full h-fit md:h-[110px] rounded-lg flex flex-col md:flex-row px-4 py-4 md:px-6 justify-between items-center gap-4">
            <div>
              <p className="text-sm md:text-lg font-normal text-[#898A8C]">
                Register using email address
              </p>
              <p className="mt-[3px] text-base md:text-xl font-medium">
                shakir260@gmail.com
              </p>
            </div>
            <div>
              <button
                onClick={() => router.push('/signUp')}
                className="bg-[#005A9C] text-white w-full md:w-[200px] p-4 md:p-0 h-[50px] md:h-[65px] flex justify-center items-center rounded"
              >
                Get Started
              </button>
            </div>
          </div>

       
        </div>

  
        <div className="w-full lg:w-1/2 hidden  lg:block mt-10 lg:mt-0 absolute top-9 right-0">
          <Image
            src="/assest/HeroAnalytics.png"
            width={800}
            height={600}
            className="w-full h-full object-contain"
            alt="Analytics"
          />
        </div>
      </section>

    </div>
  );
};

export default HeroSection;
