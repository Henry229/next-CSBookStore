'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Please enter your name.')
    .max(255, 'The name is too long.'),
  email: z
    .string()
    .email('Invalid email format.')
    .min(1, 'Please enter your email.')
    .max(255, 'The email is too long.'),
  phone: z
    .string()
    .min(1, 'Please enter your phone number.')
    .max(255, 'The phone number is too long.'),
  message: z
    .string()
    .min(1, 'Please enter your message.')
    .max(255, 'The message is too long.'),
});

type FormValues = z.infer<typeof contactFormSchema>;

// interface ContactPageProps {
// initialData?: FormValues;
// loading: boolean;
// onSubmit: (data: FormValues) => void;
// }

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };
  // loading,
  const form = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: initialFormData || {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post('/api/send-email', data);
      console.log('Mail sent successfully', response.data);
      toast.success('Message sent successfully');
    } catch (error) {
      console.log('[SENDING-MESSAGE]: ', error);
      toast.error('Fail to send Message');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4'>
        <div className='gap-8 md:grid md:grid-cols-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    {...field}
                    placeholder='full name'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={loading} {...field} placeholder='Email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input disabled={loading} {...field} placeholder='Mobile' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='md:col-span-2'>
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      {...field}
                      placeholder='Message'
                      className='resize-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button disabled={loading} className='ml-auto' type='submit'>
          Send Message
        </Button>
      </form>
    </Form>
  );
}
