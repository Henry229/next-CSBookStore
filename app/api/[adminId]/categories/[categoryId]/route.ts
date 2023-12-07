import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse('Category id is required', { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.categoryId) {
      return new NextResponse('Category id is required', { status: 400 });
    }

    const category = await prismadb.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string; admin: string } }
) {
  try {
    const { userId } = auth();

    console.log('!!!!!params', params, '/', userId);

    const body = await req.json();

    const { title } = body;

    console.log('!!!!!body', body, '/', title);

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    // if (!categoryId) {
    //   return new NextResponse('Category ID is required', { status: 400 });
    // }

    if (!title) {
      return new NextResponse('Category Name is required', { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse('Category id is required', { status: 400 });
    }

    const category = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        title,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
