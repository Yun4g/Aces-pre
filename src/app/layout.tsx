import ReduxProvider from '@/components/ReduxProvider';
import './globals.css';
import type { Metadata } from 'next';
import QueryProvider from './(providers)/QueryProvider';


export const metadata: Metadata = {
  title: 'Aces App',

};

export default function RootLayout({ children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en">'
    '
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
