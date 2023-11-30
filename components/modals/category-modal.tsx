'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCategoryModal } from '@/hooks/use-category-modal';
import { Modal } from '@/components/ui/modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const formSchema = z.object({
  name: z.string().min(1),
});

console.log('>>>>>yogida1');

export default function CategoryModal() {
  const categoryModal = useCategoryModal();
  const { user } = useUser();
  const router = useRouter();

  console.log('++++Modal isOpen?', categoryModal.isOpen);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);
      const response = await axios.post('/api/categories', values);
      if (user) {
        router.push(`/${user.id}/categories`);
      } else {
        router.push(`/sign-in`);
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title='Create Category'
      description='Add a new category to manage products.'
      // isOpen={true}
      isOpen={categoryModal.isOpen}
      onClose={categoryModal.onClose}
    >
      <div className='py-2 pb-4 space-y-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Enter category name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center justify-end w-full pt-6 space-x-2'>
              <Button
                disabled={loading}
                variant='outline'
                onClick={categoryModal.onClose}
              >
                Cancel
              </Button>
              <Button disabled={loading} type='submit'>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
