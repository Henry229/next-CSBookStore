'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';

import { Separator } from '@/components/ui/separator';
// import { ApiList } from '@/components/ui/api-list';

import { columns, CategoryColumn } from './columns';

interface CategoryClientProps {
  data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  console.log(
    '$$$$$ app > (admin) > [admin] > categories > components > client.tsx'
  );
  const params = useParams();
  const router = useRouter();
  console.log('+++++params in category client', params);

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Categories (${data.length})`}
          description='Manage categories for your bookstore'
        />
        <Button onClick={() => router.push(`/${params.admin}/categories/new`)}>
          <Plus className='w-4 h-4 mr-2' /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='label' columns={columns} data={data} />
      {/* <Heading title='API' description='API Calls for Billboards' /> */}
      {/* <Separator /> */}
      {/* <ApiList entityName='billboards' entityIdName='billboardId' /> */}
    </>
  );
};
