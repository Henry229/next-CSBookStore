import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ModalProvider } from '@/providers/modal-provider';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <>
      {/* <ModalProvider /> */}
      {children}
    </>
  );
}
