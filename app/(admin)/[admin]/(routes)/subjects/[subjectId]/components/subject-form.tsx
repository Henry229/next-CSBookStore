'use client';

import * as z from 'zod';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { Subject } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { AlertModal } from '@/components/modals/alert-modal';

const formSchema = z.object({
  title: z.string().min(1),
  value: z.string().min(1),
});

type SubjectFormValues = z.infer<typeof formSchema>;

interface SubjectFormProps {
  initialData: Subject | null;
}

export const SubjectForm: React.FC<SubjectFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const { getToken } = useAuth();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const title = initialData ? 'Edit Subject' : 'Create Subject';
  const description = initialData ? 'Edit a Subject.' : 'Add a new Subject';
  const toastMessage = initialData ? 'Subject updated.' : 'Subject created.';
  const action = initialData ? 'Save changes' : 'Create';

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
    };

    fetchToken();
  }, []);

  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      value: initialData?.value || '',
    },
  });

  const onSubmit = async (data: SubjectFormValues) => {
    try {
      setLoading(true);
      if (!token) {
        throw new Error('No authentication token available');
      }

      const headers = { Authorization: `Bearer ${token}` };
      if (initialData) {
        await axios.patch(
          `/api/${params.adminId}/subjects/${params.subjectId}`,
          data,
          { headers }
        );
      } else {
        await axios.post(`/api/${params.adminId}/subjects`, data, { headers });
      }
      router.push(`/${params.admin}/subjects`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.adminId}/subjects/${params.subjectId}`);
      router.push(`/${params.admin}/subjects`);
      toast.success('Subject deleted.');
    } catch (error: any) {
      toast.error(
        'Make sure you removed all product using this subject first.'
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant='destructive'
            size='sm'
            onClick={() => setOpen(true)}
          >
            <Trash className='w-4 h-4' />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-8'
        >
          <div className='gap-8 md:grid md:grid-cols-3'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Subject name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Subject value'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
