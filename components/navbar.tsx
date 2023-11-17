import Link from 'next/link';
import { UserButton, auth } from '@clerk/nextjs';

import MainNav from '@/components/main-nav';
import Container from '@/components/ui/container';
import LoginNav from '@/components/login-nav';

export default async function Navbar() {
  const { userId } = await auth();
  const isAuth = !!userId;

  return (
    <div className='border-b'>
      <Container>
        <div className='flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8'>
          <Link href='/' className='flex m-4 lg:ml-0 gap-x-2'>
            <p className='text-xl font-bold'>Book Store</p>
          </Link>
          <div className='flex items-center ml-auto space-x-4'>
            <MainNav />
            {!isAuth ? (
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
