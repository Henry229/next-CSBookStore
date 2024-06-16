import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import prismadb from '@/lib/prismadb';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';

export async function POST(
  req: Request,
  { params }: { params: { adminId: string } }
) {
  try {
    // const { userId } = auth();

    console.log('****>>> adminId', '////', params.adminId);

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

    // if (!userId) {
    //   return new NextResponse('Unauthenticated', { status: 403 });
    // }

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
    console.log('****>>> adminId', params.adminId);

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

    console.log('****>>> product', product);
    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof PrismaClientUnknownRequestError) {
      console.error('Prisma error code:', error.name);
      console.error('Prisma error message:', error.message);
      // 에러 코드에 따른 추가적인 처리를 할 수 있습니다.
      // 예를 들어, P2002는 unique constraint violation을 나타냅니다.
      if (error.name === 'P2002') {
        return new NextResponse('Unique constraint failed', { status: 409 });
      }
    } else {
      // Prisma의 에러가 아닌 다른 타입의 에러를 처리합니다.
      const err = error as Error;
      console.error('Error message :', err.message);
      console.error('Stack Trace :', err.stack);
    }
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

    const products = await prismadb.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
