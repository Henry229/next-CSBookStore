import { NextRequest, NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
// import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    if (!params.itemId) {
      return NextResponse.json('Item id is required', { status: 400 });
    }
    const item = await prismadb.item.findUnique({
      where: { id: params.itemId },
    });
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error('오류발생 :', err.message);
    console.error('스택 트레이스 :', err.stack);
    return NextResponse.json('INternal error!', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.itemId) {
      return new NextResponse('Item id is required', { status: 400 });
    }

    const item = await prismadb.item.delete({
      where: {
        id: params.itemId,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.log('[ITEM_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { title, value } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!title) {
      return new NextResponse('Item Name is required', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Item Value is required', { status: 400 });
    }

    if (!params.itemId) {
      return new NextResponse('Item id is required', { status: 400 });
    }

    const item = await prismadb.item.update({
      where: {
        id: params.itemId,
      },
      data: {
        title,
        value,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.log('[ITEM_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
