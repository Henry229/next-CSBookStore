'use client';

import CategoryModal from '@/components/modals/category-modal';
import { useEffect, useState } from 'react';

// import { StoreModal } from '@/components/modals/store-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CategoryModal />
      {/* <StoreModal /> */}
    </>
  );
};
