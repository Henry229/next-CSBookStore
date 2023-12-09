import { format } from 'date-fns';
import { ItemColumn } from './components/columns';
import { ItemClient } from './components/client';
import prismadb from '@/lib/prismadb';

export default async function ItemsPage({
  params,
}: {
  params: { admin: string };
}) {
  const items = await prismadb.item.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedItems: ItemColumn[] = items.map((item) => ({
    id: item.id,
    title: item.title,
    value: item.value,
    createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <ItemClient data={formattedItems} />
      </div>
    </div>
  );
}
