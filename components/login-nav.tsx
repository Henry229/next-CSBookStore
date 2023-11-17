import { useClerk } from '@clerk/nextjs';
import Link from 'next/link';

export default function LoginNav() {
  return (
    <div className='flex gap-2 '>
      <Link
        href={'/sign-up'}
        className='px-5 py-2 border border-black rounded-md'
      >
        Sign Up
      </Link>
      <Link
        href={'/sign-in'}
        className='px-5 py-2 text-white bg-black border border-black rounded-md'
      >
        Log In
      </Link>
    </div>
  );
}
