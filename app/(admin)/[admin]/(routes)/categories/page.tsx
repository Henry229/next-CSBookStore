import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function CategoriesPage() {
  const { userId } = auth();

  console.log('========여 와따!!!');

  if (!userId) {
    console.log('안되네!!!');

    // redirect('/sign-in');
  }
  return (
    <>
      <p>쫌 대라</p>
      <p>쫌 대라</p>
      <p>쫌 대라</p>
      <p>쫌 대라</p>
    </>
  );
}
