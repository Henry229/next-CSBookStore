'use client';

import { auth, useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { format } from 'date-fns';
import { CategoryColumn } from './components/columns';
import { CategoryClient } from './components/client';
import { useGetCategory } from '@/hooks/use-get-category';
import { Category } from '@prisma/client';
import { useEffect } from 'react';

export default function CategoriesPage() {
  console.log('$$$ app > (admin) > [admin] > (routes) > categories > page.tsx');

  const { categories, setCategories } = useGetCategory();
  const { userId } = useAuth();

  console.log('+++++userId in category route', userId);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`/api/${userId}/categories`);
        const fetchedCategories = response.data;
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // 오류 처리 로직
      }
    };

    if (userId) {
      fetchCategories();
    }
  }, []);

  // if (!userId) {
  // redirect('/sign-in');
  // return null;
  // }

  type CategoryItem = {
    id: string;
    label: string;
    createdAt: Date;
  };

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    label: item.title,
    createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
}
