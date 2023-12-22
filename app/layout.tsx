import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';

import { ClerkProvider, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { ToastProvider } from '@/providers/toast-provider';
import { ModalProvider } from '@/providers/modal-provider';
import Navbar from '@/components/navbar';

import { PulseLoader } from 'react-spinners';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CS BookStore',
  description: 'Explore our wide range of books',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('$$$$$ app > layout.tsx');
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
            <ClerkLoading>
              <div className='flex flex-col items-center mt-32 text-center'>
                <PulseLoader size={8} color='red' />
              </div>
            </ClerkLoading>
            <ClerkLoaded>
              <ToastProvider />
              {/* <ModalProvider /> */}
              <Navbar />
              {children}
            </ClerkLoaded>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
