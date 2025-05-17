'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const HeroSection = () => {
  const router = useRouter();

  const Images = [
    { src: '/assest/company1.png' },
    { src: '/assest/company2.png' },
    { src: '/assest/company3.png' },
    { src: '/assest/company4.png' },
    { src: '/assest/companyfive.png' },
    { src: '/assest/companysix.png' },
    { src: '/assest/company7.png' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row h-fit w-full px-6 md:ps-12 lg:ps-24 py-12">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 h-full lg:pt-24">
          {/* <h1 className="text-lg md:text-xl font-bold mt-10">
            Product Growth Solution in Single Platform.
          </h1> */}
          <p className="text-3xl sm:text-5xl lg:text-[68px] font-semibold mt-4 leading-tight">
            Student
          </p>
          <p className="text-3xl sm:text-5xl lg:text-[68px] font-semibold mt-2 leading-tight">
            Referral Process
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
                team@aces.org
              </p>
            </div>
            <div>
              <button
                onClick={() => router.push('/signup')}
                className="bg-[#005A9C] text-white w-full md:w-[200px] p-4 md:p-0 h-[50px] md:h-[65px] flex justify-center items-center rounded"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Benefits */}
          {/* <div className="mt-5 flex flex-col sm:flex-row gap-4">
            <p className="flex items-center text-sm md:text-base">
              <Image
                src="/assest/tick.png"
                width={20}
                height={20}
                className="mr-2"
                alt="tick"
              />
              Free Register
            </p>
            <p className="flex items-center text-sm md:text-base">
              <Image
                src="/assest/tick.png"
                width={20}
                height={20}
                className="mr-2"
                alt="tick"
              />
              Great Service
            </p>
          </div> */}
        </div>

  
        <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
          <Image
            src="/assest/HeroAnalytics.png"
            width={800}
            height={600}
            className="w-full h-auto object-contain"
            alt="Analytics"
          />
        </div>
      </section>

      {/* <div className="py-12 px-4 md:px-12 w-full flex flex-col justify-center items-center border-t-2 border-b-2">
        <p className="text-lg md:text-xl lg:text-2xl font-medium text-center">
          Over 32k+ software businesses growing with AR Shakir
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-6 md:gap-10">
          {Images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              width={100}
              height={24}
              className="h-6 object-contain"
              alt={`company-${index + 1}`}
            />
          ))}
        </div>
      </div> */}
    </>
  );
};

export default HeroSection;
