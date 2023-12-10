import { format } from 'date-fns';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';
import { CategoryColumn } from './components/columns';
import { CategoryClient } from './components/client';

export default async function CategoriesPage() {
  const { userId } = auth();
  console.log('++++userId', userId);

  if (!userId) {
    return null;
  }

  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

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
