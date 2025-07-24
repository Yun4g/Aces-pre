import ReduxProvider from '@/components/ReduxProvider';
import './globals.css';
import type { Metadata } from 'next';
import QueryProvider from './(providers)/QueryProvider';
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aces App',
  description: ' Aces App - Your Gateway to Educational Excellence',
};

export default function RootLayout({ children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="overflow-x-hidden bg-white text-black "> 
         <QueryProvider>
          <ReduxProvider>  
            {children}
          </ReduxProvider> 
          </QueryProvider>

         
      </body>
    </html>
  );
}
