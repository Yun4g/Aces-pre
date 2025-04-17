'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    router.push(`/${path}`);
    setIsMenuOpen(false); 
  };

  return (
    <nav className="px-6 md:px-[94px] py-4 bg-white flex justify-between items-center z-[1000] fixed top-0 w-full shadow-md">
      {/* Logo */}
      <div>
        <Image src="/assest/logo.png" alt="Logo" width={120} height={40} />
      </div>


      <div className="hidden md:flex gap-8 text-[16px] cursor-pointer font-[500]">
        {['Product', 'Template', 'Blog'].map((item, index) => (
          <p
            key={index}
            className="flex items-center gap-2 font-normal text-[#333333] text-sm"
          >
            {item} <FaChevronDown />
          </p>
        ))}
      </div>

      {/* Hamburger */}
      <button
        className="md:hidden text-[#333333] text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-[70px] left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {['Product', 'Template', 'Blog'].map((item, index) => (
          <p
            key={index}
            className="flex items-center gap-2 font-normal text-[#333333] text-sm"
          >
            {item} <FaChevronDown />
          </p>
        ))}
        <button onClick={() => handleNavigate('login')} className="font-normal text-[#333333] text-sm">
          Sign In
        </button>
        <button
          onClick={() => handleNavigate('signUp')}
          className="font-normal bg-[#005A9C] text-white w-[172px] h-[54px] text-base rounded-xl"
        >
          Get Started
        </button>
      </div>

      {/* Desktop Sign In / Get Started */}
      <div className="hidden md:flex justify-center items-center gap-8">
        <button onClick={() => handleNavigate('login')} className="font-normal text-[#333333] text-sm">
          Sign In
        </button>
        <button
          onClick={() => handleNavigate('signup')}
          className="font-normal bg-[#005A9C] text-white w-[172px] h-[54px] text-base rounded-xl ml-4"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
