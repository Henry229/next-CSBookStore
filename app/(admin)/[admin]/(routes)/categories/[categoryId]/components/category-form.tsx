'use client';

import * as z from 'zod';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { Category } from '@prisma/client';
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
import { useGetCategory } from '@/hooks/use-get-category';

const formSchema = z.object({
  title: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: Category | null;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const { getToken } = useAuth();

  // const { categories, setCategories } = useGetCategory();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const title = initialData ? 'Edit category' : 'Create category';
  const description = initialData ? 'Edit a category.' : 'Add a new category';
  const toastMessage = initialData ? 'Category updated.' : 'Category created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: '',
    },
  });

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
    };
    fetchToken();
  });

  // const updateCategories = async () => {
  //   try {
  //     const response = await axios.get(`/api/${params.adminId}/categories`);
  //     setCategories(response.data);
  //   } catch (error) {
  //     toast.error('Failed to update categories.');
  //   }
  // };

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (!token) {
        throw new Error('No authentication token available');
      }

      const headers = { Authorization: `Bearer ${token}` };
      if (initialData) {
        await axios.patch(
          `/api/${params.adminId}/categories/${params.categoryId}`,
          data,
          { headers }
        );
      } else {
        await axios.post(`/api/${params.adminId}/categories`, data, {
          headers,
        });
      }
      // router.refresh();
      // await updateCategories();
      router.push(`/${params.admin}/categories`);
      toast.success(toastMessage);
    } catch (error: any) {
      const err = error as Error;
      console.error('Error message :', err.message);
      console.error('Stack Trace :', err.stack);
      console.log('[CATEGORY_CREATE]', error);
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.adminId}/categories/${params.categoryId}`
      );
      // router.refresh();
      // await updateCategories();
      router.push(`/${params.admin}/categories`);
      toast.success('Category deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all categories.');
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
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Category name'
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
