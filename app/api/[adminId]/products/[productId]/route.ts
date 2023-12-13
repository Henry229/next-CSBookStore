import { NextRequest, NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
// import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return NextResponse.json('Product id is required', { status: 400 });
    }
    const item = await prismadb.product.findUnique({
      where: { id: params.productId },
    });
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error('Error message :', err.message);
    console.error('Stack Trace :', err.stack);
    return NextResponse.json('Internal error!', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
    }

    const item = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; adminId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const {
      title,
      price,
      categoryId,
      images,
      itemId,
      subjectId,
      description,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!title) {
      return new NextResponse('Product Title is required', { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse('Images are required', { status: 400 });
    }

    if (!price) {
      return new NextResponse('Product price is required', { status: 400 });
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

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
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
    console.log('[SUBJECT_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
