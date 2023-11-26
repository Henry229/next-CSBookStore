import { create } from 'zustand';

interface useCategoryModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCategoryModal = create<useCategoryModalProps>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
