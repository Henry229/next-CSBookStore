import prismadb from '@/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    // const url = new URL(req.url, `http://${req.headers.get('host')}`);
    const categoryId = url.searchParams.get('categoryId');
    const itemId = url.searchParams.get('itemId');
    const subjectId = url.searchParams.get('subjectId');

    if (!categoryId) {
      return new NextResponse('Category id is required', { status: 400 });
    }

    const whereClause = {
      categoryId,
      ...(itemId && { itemId }),
      ...(subjectId && { subjectId }),
    };

    const products = await prismadb.product.findMany({
      where: whereClause,
      include: {
        category: true,
        item: true,
        subject: true,
        images: true,
      },
    });

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error('오류발생 :', err.message);
    console.error('스택 트레이스 :', err.stack);
    return new NextResponse('Internal error', { status: 500 });
  }
}
