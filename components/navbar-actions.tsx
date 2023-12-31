'use client';

import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import MobileButton from '@/components/ui/mobile-button';
import useCart from '@/hooks/use-cart';

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className='flex flex-col items-center justify-center w-full ml-auto lg:flex-row lg:items-center lg:justify-start lg:w-auto gap-x-4'>
      <MobileButton
        onClick={() => router.push('/cart')}
        className='flex items-center px-4 py-2 bg-black rounded-full'
      >
        <ShoppingBag size={20} color='white' />
        <span className='ml-2 text-sm font-medium text-white'>
          {cart.items.length}
        </span>
      </MobileButton>
    </div>
  );
};

export default NavbarActions;
