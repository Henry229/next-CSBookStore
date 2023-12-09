import prismadb from '@/lib/prismadb';

import { ItemForm } from './components/item-form';

const ItemPage = async ({ params }: { params: { itemId: string } }) => {
  const item = await prismadb.item.findUnique({
    where: {
      id: params.itemId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <ItemForm initialData={item} />
      </div>
    </div>
  );
};

export default ItemPage;
