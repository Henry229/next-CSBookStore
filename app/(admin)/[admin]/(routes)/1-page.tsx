'use client';

import { useCategoryModal } from '@/hooks/use-category-modal';
import { useEffect } from 'react';

export default function SetupPage() {
  const onOpen = useCategoryModal((state) => state.onOpen);
  const isOpen = useCategoryModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return null;
}
