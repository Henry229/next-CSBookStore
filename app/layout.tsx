import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';

import { ClerkProvider, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { ModalProvider } from '@/providers/modal-provider';
import Navbar from '@/components/navbar';

import { SyncLoader } from 'react-spinners';
import toast from 'react-hot-toast';

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
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <ClerkLoading>
            <div className='flex flex-col items-center mt-32 text-center'>
              <SyncLoader size={8} color='red' />
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            {/* <ModalProvider /> */}
            <Navbar />
            {children}
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
