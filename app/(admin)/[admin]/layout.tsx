'use client';

import prismadb from '@/lib/prismadb';
import { ModalProvider } from '@/providers/modal-provider';
import { auth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useUser();
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  useEffect(() => {
    const handleRedirect = async () => {
      if (!user) {
        router.push('/sign-in');
      } else {
        try {
          const response = await axios.get('/api/categories');
          const categories = response.data;
          console.log('+++++category', categories);

          if (categories.length > 0) {
            const firstCategory = categories[0];
            router.push(`/${user.id}/categories`);
          } else {
            setShowCategoryModal(true);
          }
        } catch (error) {
          console.error('getting error while processing API', error);
        }
      }
    };

    handleRedirect();
  }, [user, router]);

  // if (!userId) {
  //   redirect('/sign-in');
  // }

  // const category = await prismadb.category.findFirst();
  // console.log('+++++category', category);

  // if (category) {
  //   redirect(`/${userId}/categories`);
  // }

  return (
    <>
      {showCategoryModal && <ModalProvider />}
      {children}
    </>
  );
}
