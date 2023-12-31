'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { ProductColumn, columns } from './columns';

interface ProductsClientProps {
  data: ProductColumn[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Products (${data.length})`}
          description='Manage products for your bookstore'
        />
        <Button onClick={() => router.push(`/${params.admin}/products/new`)}>
          <Plus className='w-4 h-4 mr-2' /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='title' columns={columns} data={data} />
    </>
  );
};
