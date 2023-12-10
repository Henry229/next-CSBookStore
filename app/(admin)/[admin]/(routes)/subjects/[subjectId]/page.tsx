import prismadb from '@/lib/prismadb';

import { SubjectForm } from './components/subject-form';

const SubjectPage = async ({ params }: { params: { subjectId: string } }) => {
  const subject = await prismadb.subject.findUnique({
    where: {
      id: params.subjectId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 p-8 pt-6 space-y-4'>
        <SubjectForm initialData={subject} />
      </div>
    </div>
  );
};

export default SubjectPage;
