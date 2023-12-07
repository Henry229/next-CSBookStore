'use client';

import { useCategoryModal } from '@/hooks/use-category-modal';
import { useGetCategory } from '@/hooks/use-get-category';
import prismadb from '@/lib/prismadb';
import { ModalProvider } from '@/providers/modal-provider';
import { auth, useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { set } from 'date-fns';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuth();
  const { categories, setCategories } = useGetCategory();
  const { isOpen, onOpen, onClose } = useCategoryModal();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  console.log('$$$$$ app > (admin) > [admin] > layout.tsx');

  useEffect(() => {
    const handleRedirect = async () => {
      console.log('+++++user', user);

      if (!user) {
        router.push('/sign-in');
      } else {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/${user.userId}/categories`
          );
          const fetchedCategories = response.data;
          setCategories(fetchedCategories);
          if (fetchedCategories.length > 0) {
            onClose();
            router.push(`/${user.userId}/categories`);
          } else {
            onOpen();
            // setShowCategoryModal(true);
          }
        } catch (error) {
          console.error('getting error while processing API', error);
          onOpen();
        }
      }
    };

    handleRedirect();
  }, [user.userId]);
  // }, [user, router, onOpen]);

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
      {isOpen && <ModalProvider />}
      {/* {showCategoryModal && <ModalProvider />} */}
      {children}
    </>
  );
}
