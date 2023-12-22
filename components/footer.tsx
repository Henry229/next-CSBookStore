import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='bg-white border-t dark:bg-black'>
      <div className='flex items-center px-6 py-12 mx-auto space-x-2'>
        <Image src='/cslogo.svg' width={34} height={34} alt='logo' />
        <p className='text-xl font-bold'>TestBank</p>
        <p className='text-xs text-center text-black dark:text-white'>
          &copy; 2023 CS TestBank, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
