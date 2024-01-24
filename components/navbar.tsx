'use client';

import Link from 'next/link';
import Image from 'next/image';
import { UserButton, auth, useUser } from '@clerk/nextjs';
import { useState } from 'react';

import MainNav from '@/components/main-nav';
import Container from '@/components/ui/container';
import LoginNav from '@/components/login-nav';
import { ThemeToggle } from './theme-toggle';
import { X, Menu } from 'lucide-react';

export default function Navbar() {
  // const { userId } = await auth();
  // const isAuth = !!userId;
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className='border-b'>
      <Container>
        {/* <pre>{JSON.stringify({ isSignedIn }, null, 2)}</pre> */}
        <div className='flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8'>
          <Link href='/' className='flex m-2 lg:ml-0 gap-x-2'>
            {/* <Image src='/cslogo.svg' width={34} height={34} alt='logo' /> */}
            <p className='text-xl font-bold'>TestBank</p>
          </Link>
          <div className='flex-row items-center hidden ml-auto space-x-4 md:flex'>
            <MainNav />
            {!isSignedIn ? (
              <LoginNav />
            ) : (
              <div className='flex items-center ml-auto space-x-4'>
                <ThemeToggle />
                <UserButton afterSignOutUrl='/' />
              </div>
            )}
          </div>
          <button
            className='z-50 md:hidden'
            onClick={toggleMenu}
            aria-label='Toggle Menu'
          >
            {isMenuOpen ? <X size={24} color='red' /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          // <div className='lg:hidden fixed inset-0 top-[4rem] left-0 z-50 bg-white p-4'>
          <div
            className={`md:hidden fixed inset-y-0 right-0 transform ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out bg-white dark:bg-black w-64 p-6 space-y-2 flex flex-col items-center`}
          >
            <MainNav />
            {!isSignedIn ? (
              <LoginNav />
            ) : (
              <>
                <ThemeToggle />
                <UserButton afterSignOutUrl='/' />
              </>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
