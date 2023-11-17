import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
      <SignIn />
      <div className='flex mt-2 text-sm'>
        <p>Forgot Password?</p>
        <Link href={'/forget-password'} className='ml-2 text-blue-400 '>
          Reset here
        </Link>
      </div>
    </div>
  );
}
