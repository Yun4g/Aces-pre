import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="lg:px-[98px] bg-white   h-80  py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-start gap-y-10">
          {/* Logo Section */}
          <div className="w-full md:w-1/4">
            <div>
              <Image
                className="object-contain"
                src="/assest/logo.png" 
                width={110}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="text-base w-60 text-[#757095] mt-4">
              Simple innate summer fat appear basket his desire joy.
            </p>
          </div>

          {/* Company Links */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="flex flex-col gap-[18px] text-[#181433]">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="flex flex-col gap-[18px] text-[#181433]">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Free Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Contract Templates
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold mb-4">Join Our Newsletter</h3>
            <form>
              <div className="w-full h-28 md:h-14 bg-[#F9F9F9] border flex flex-col sm:flex-row border-gray-300 rounded-md mb-2 overflow-hidden">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="outline-none pl-6 h-20 md:h-full bg-transparent"
                />
                <button
                  type="submit"
                  className="w-full h-20 md:h-full bg-[#00E1F0] text-white"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="text-base text-[#181433] mt-4">
              * Will send you weekly updates for your better finance management.
            </p>
          </div>
        </div>

        <div className="w-full bg-slate-400 border mt-10 mb-7"></div>

        {/* Copyright Section */}
        <div className="pb-11 text-center text-base font-semibold text-[#181433]">
          Copyright © AR Shakir 2022. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
