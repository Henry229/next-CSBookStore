import prismadb from '@/lib/prismadb';

import { ProductForm } from './components/product-form';

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany();

  const items = await prismadb.item.findMany();

  const subjects = await prismadb.subject.findMany();

  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <ProductForm
          categories={categories}
          items={items}
          subjects={subjects}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
