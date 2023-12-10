import { format } from 'date-fns';
import { SubjectColumn } from './components/columns';
import { SubjectClient } from './components/client';
import prismadb from '@/lib/prismadb';

export default async function SubjectsPage({
  params,
}: {
  params: { admin: string };
}) {
  const subjects = await prismadb.subject.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedSubjects: SubjectColumn[] = subjects.map((item) => ({
    id: item.id,
    title: item.title,
    value: item.value,
    createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <SubjectClient data={formattedSubjects} />
      </div>
    </div>
  );
}
