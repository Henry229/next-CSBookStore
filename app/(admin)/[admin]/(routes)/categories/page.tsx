'use client';

import { auth, useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { format } from 'date-fns';
import { CategoryColumn } from './components/columns';
import { CategoryClient } from './components/client';
import { useGetCategory } from '@/hooks/use-get-category';

export default function CategoriesPage() {
  console.log('$$$ app > (admin) > [admin] > (routes) > categories > page.tsx');

  const { categories, setCategories } = useGetCategory();
  const { userId } = useAuth();

  console.log('+++++userId in category route', userId);

  if (!userId) {
    console.log('안되네!!!');
    // redirect('/sign-in');
    return null;
  }

  type CategoryItem = {
    id: string;
    label: string;
    createdAt: Date;
  };

  // const response = await axios.get('/api/categories');
  // const response = await axios.get('http://localhost:3000/api/categories');
  // 응답이 JSON이 아닌 경우 콘솔에 로그를 출력
  // if (response.headers['content-type'] !== 'application/json') {
  // console.error('Expected JSON response, but got:', response.data);
  // return; // 또는 적절한 에러 처리를 진행
  // }
  // const categories = response.data;
  console.log('+++++====== categories', categories);

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    label: item.title,
    createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <h1 className='text-2xl font-semibold'>Categories</h1>
        {/* <CategoryClient data={formattedCategories} /> */}
      </div>
    </div>
  );
}
