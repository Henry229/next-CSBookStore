import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';

import { ProductColumn } from './components/columns';
import { ProductsClient } from './components/client';

const ProductsPage = async ({ params }: { params: { admin: string } }) => {
  const products = await prismadb.product.findMany({
    include: {
      category: true,
      item: true,
      subject: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    title: product.title,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formatter.format(product.price),
    category: product.category.title,
    item: product.item.title,
    subject: product.subject.title,
    createdAt: format(product.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
