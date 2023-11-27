import prismadb from '@/lib/prismadb';
import { ModalProvider } from '@/providers/modal-provider';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const category = await prismadb.category.findFirst();
  console.log('+++++category', category);

  if (category) {
    redirect(`/${userId}/categories`);
  }

  return (
    <>
      <ModalProvider />
      {children}
    </>
  );
}
