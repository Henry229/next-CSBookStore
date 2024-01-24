import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  const { productIds } = await req.json();

  console.log('>>>>==== productIds', productIds);

  if (!productIds || productIds.length === 0) {
    return new NextResponse('Product ids are required', { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'AUD',
        product_data: {
          name: product.title,
        },
        unit_amount: product.price * 100,
      },
    });
  });

  console.log(
    '>>>>====++++ products , line_items : ',
    products,
    '/',
    line_items
  );

  const order = await prismadb.order.create({
    data: {
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    success_url: 'http://next-cs-book-store.vercel.app/cart?success=1',
    cancel_url: 'http://next-cs-book-store.vercel.app/cart?canceled=1',
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json({ url: session.url });
}
