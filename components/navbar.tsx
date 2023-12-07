'use client';

import Link from 'next/link';
import Image from 'next/image';
import { UserButton, auth, useUser } from '@clerk/nextjs';

import MainNav from '@/components/main-nav';
import Container from '@/components/ui/container';
import LoginNav from '@/components/login-nav';

export default function Navbar() {
  // const { userId } = await auth();
  // const isAuth = !!userId;
  const { isSignedIn } = useUser();

  return (
    <div className='border-b'>
      <Container>
        {/* <pre>{JSON.stringify({ isSignedIn }, null, 2)}</pre> */}
        <div className='flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8'>
          <Link href='/' className='flex m-2 lg:ml-0 gap-x-2'>
            <Image src='/cslogo.svg' width={34} height={34} alt='logo' />
            <p className='text-xl font-bold'>TestBank</p>
          </Link>
          <div className='flex items-center ml-auto space-x-4'>
            <MainNav />
            {!isSignedIn ? (
              <LoginNav />
            ) : (
              <div className='flex items-center ml-auto space-x-4'>
                <UserButton afterSignOutUrl='/' />
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
