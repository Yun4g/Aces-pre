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
    const navItems = [
        { to: '/Dashboard/RefeeralDashboard/mainDashBoard', icon: 'DashBoard.png', label: 'Dashboard' },
        { to: '/Dashboard/RefeeralDashboard/referals', icon: 'ReferalIcon.png', label: 'Referrals' },
        { to: '/Dashboard/RefeeralDashboard/analytics', label: 'Analytics' },
    ];
    const isRouteActive = (path: string) => {
        return pathname === path || pathname.startsWith(`${path}/`);
    };


    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/login';
    }


    return (
        <div
            className={`fixed top-0 left-0 h-full w-[250px] bg-white dark:bg-gray-900 dark:text-white  z-50 transform transition-transform duration-300  
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:block`}
        >
            <nav className="flex flex-col justify-between h-full">

                <div>
                    <div className="mb-6 pb-5 md;border-b-2  px-6 py-4 flex justify-between items-center">
                        <Image src="/assest/logo.png" width={110} height={30} alt="Logo" />

                        <button className="md:hidden" onClick={onClose}>
                            ✕
                        </button>
                    </div>

                    <div className="px-6 ">
                        <p className="text-[#898A8C] text-sm font-bold  uppercase tracking-wide">Main</p>
                    </div>

                    <div className="space-y-3 px-6 py-4 text-sm">
                        {navItems.map(({ to, icon, label }) => (
                            <Link key={to} href={to}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all 
                             ${isRouteActive(to)
                                        ? 'bg-blue-50 text-blue-600 rounded-[8px] font-medium'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <span>
                                    {
                                        label === 'Analytics' ? (
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.50033 18.8333H12.5003C16.667 18.8333 18.3337 17.1666 18.3337 13V7.99996C18.3337 3.83329 16.667 2.16663 12.5003 2.16663H7.50033C3.33366 2.16663 1.66699 3.83329 1.66699 7.99996V13C1.66699 17.1666 3.33366 18.8333 7.50033 18.8333Z" stroke="#898A8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M12.9167 15.9167C13.8333 15.9167 14.5833 15.1667 14.5833 14.25V6.75004C14.5833 5.83337 13.8333 5.08337 12.9167 5.08337C12 5.08337 11.25 5.83337 11.25 6.75004V14.25C11.25 15.1667 11.9917 15.9167 12.9167 15.9167Z" stroke="#898A8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.08366 15.9166C8.00033 15.9166 8.75033 15.1666 8.75033 14.25V11.3333C8.75033 10.4166 8.00033 9.66663 7.08366 9.66663C6.16699 9.66663 5.41699 10.4166 5.41699 11.3333V14.25C5.41699 15.1666 6.15866 15.9166 7.08366 15.9166Z" stroke="#898A8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        ) : (
                                            <Image
                                                src={`/assest/${icon}`}
                                                width={20}
                                                height={20}
                                                className={`w-5 h-5 ${isRouteActive(to) ? 'filter-blue' : 'filter-gray'}`}
                                                alt={label}
                                            />
                                        )
                                    }
                                </span>

                                {label}
                            </Link>
                        ))
                        }

                    </div>

                </div>
                <div className="pt-4 px-8 py-4 md:border-t-2">
                    <div className=' flex flex-wrap w-full  items-center gap-3 justify-center  shadow-xl  border-2 dark:border-gray-700  duration-300 py-3   rounded-xl text-sm transition-all'>
                        <ThemeToggle />
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 justify-center mt-3 border border-red-500 text-red-500 px-4 py-2 rounded-[8px] text-sm hover:bg-red-50 transition-all">
                        <span>
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 8V12.1667" stroke="#EC2D30" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.99986 18.3417H4.94986C2.0582 18.3417 0.849863 16.275 2.24986 13.75L4.84986 9.06665L7.29986 4.66665C8.7832 1.99165 11.2165 1.99165 12.6999 4.66665L15.1499 9.07498L17.7499 13.7583C19.1499 16.2833 17.9332 18.35 15.0499 18.35H9.99986V18.3417Z" stroke="#EC2D30" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.99512 14.6667H10.0026" stroke="#EC2D30" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </span>
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default NavbarReferal;
