import { create } from 'zustand';

type Category = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

interface useGetCategoryProps {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export const useGetCategory = create<useGetCategoryProps>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));
