'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/themeToggle';

type NavbarReferalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const NavbarReferal: React.FC<NavbarReferalProps> = ({ isOpen, onClose }) => {
    const pathname = usePathname();
    
    // Navigation items with correct path structure
    const navItems = [
        { to: '/Dashboard/RefeeralDashboard/mainDashBoard', icon: 'DashBoard.png', label: 'Dashboard' },
        { to: '/Dashboard/RefeeralDashboard/referals', icon: 'ReferalIcon.png', label: 'Referrals' },
        { to: '/Dashboard/RefeeralDashboard/analytics', icon: 'chart-2.png', label: 'Analytics' },
        { to: '/Dashboard/RefeeralDashboard/settings', icon: 'settingsicon.png', label: 'Settings' },
    ];
    
   
    const isRouteActive = (path: string) => {
        return pathname === path || pathname.startsWith(`${path}/`);
    };

    return (
        <div
            className={`fixed top-0 left-0 h-full w-[250px] bg-white dark:bg-gray-900 dark:text-white  z-50 transform transition-transform duration-300 shadow-md border-r 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:block`}
        >
            <nav className="flex flex-col justify-between h-full">
                {/* Logo */}
                <div>
                    <div className="mb-6 pb-5 md;border-b-2  px-6 py-4 flex justify-between items-center">
                        <Image src="/assest/logo.png" width={110} height={30} alt="Logo" />
                    
                        <button className="md:hidden" onClick={onClose}>
                            ✕
                        </button>
                    </div>

                    <div className="px-6 py-4">
                        <p className="text-gray-500 text-sm font-bold mb-3 uppercase tracking-wide">Main</p>
                    </div>

                    <div className="space-y-3 px-6 py-4 text-sm">
                        {navItems.map(({ to, icon, label }) => (
                            <Link
                                key={to}
                                href={to}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all 
                                    ${isRouteActive(to) 
                                        ? 'bg-blue-50 text-blue-600 font-medium' 
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Image src={`/assest/${icon}`} width={20} height={20} className="w-5 h-5" alt={label} />
                                {label}
                            </Link>
                        ))}
                        
                    </div>
                 
                </div>

                {/* Logout */}
                <div className="pt-4 px-8 py-4 md:border-t-2">
                   <div className=' flex flex-wrap w-full  items-center gap-3 justify-center  shadow-xl  border-2 dark:border-gray-700 transition-colors duration-300 py-3   rounded-xl text-sm transition-all'>
                        <ThemeToggle /> 
                    </div>
                    <button className="w-full flex items-center gap-3 justify-center mt-3 border border-red-400 text-red-500 px-4 py-2 rounded-md text-sm hover:bg-red-50 transition-all">
                        <Image src="/assest/logoutcon.png" width={16} height={16} className="w-4 h-4" alt="Logout" />
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default NavbarReferal;
