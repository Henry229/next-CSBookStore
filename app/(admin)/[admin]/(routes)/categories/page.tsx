import { auth } from '@clerk/nextjs';
import axios from 'axios';
import { format } from 'date-fns';
import { CategoryColumn } from './components/columns';

export default async function CategoriesPage() {
  const { userId } = auth();

  if (!userId) {
    console.log('안되네!!!');
    // redirect('/sign-in');
  }

  type CategoryItem = {
    id: string;
    label: string;
    createdAt: Date;
  };

  const response = await axios.get('/api/categories');
  const categories = response.data;

  const formattedCategories: CategoryColumn[] = categories.map(
    (item: CategoryItem) => ({
      id: item.id,
      label: item.label,
      createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    })
  );

  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <CategoryClient />
      </div>
    </div>
  );
}