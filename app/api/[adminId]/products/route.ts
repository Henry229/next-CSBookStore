import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { adminId: string } }
) {
  try {
    const { userId } = auth();

    console.log('****>>> userId | adminId', userId, '////', params.adminId);

    const body = await req.json();

    const {
      title,
      price,
      categoryId,
      itemId,
      subjectId,
      images,
      description,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!title) {
      return new NextResponse('Title is required', { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse('Images are required', { status: 400 });
    }

    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse('Category id is required', { status: 400 });
    }

    if (!itemId) {
      return new NextResponse('Item id is required', { status: 400 });
    }

    if (!subjectId) {
      return new NextResponse('Subject id is required', { status: 400 });
    }

    if (!description) {
      return new NextResponse('description is required', { status: 400 });
    }

    if (!params.adminId) {
      return new NextResponse('Admin id is required', { status: 400 });
    }

    const product = await prismadb.product.create({
      data: {
        title,
        price,
        categoryId,
        itemId,
        subjectId,
        description,
        isFeatured,
        isArchived,
        images: {
          createMany: {
            data: [...images.map((image: { usl: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    const err = error as Error;
    console.error('Error message :', err.message);
    console.error('Stack Trace :', err.stack);
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { adminId: string } }
) {
  try {
    if (!params.adminId) {
      return new NextResponse('Admin id is required', { status: 400 });
    }

    const subjects = await prismadb.subject.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(subjects);
  } catch (error) {
    console.log('[SUBJECTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
