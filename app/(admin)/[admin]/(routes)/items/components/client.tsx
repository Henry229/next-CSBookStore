'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { columns, ItemColumn } from './columns';

interface ItemsClientProps {
  data: ItemColumn[];
}

export const ItemClient: React.FC<ItemsClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Items (${data.length})`}
          description='Manage Items for your bookstore'
        />
        <Button onClick={() => router.push(`/${params.admin}/items/new`)}>
          <Plus className='w-4 h-4 mr-2' /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='title' columns={columns} data={data} />
    </>
  );
};
