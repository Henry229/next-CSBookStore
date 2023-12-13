import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { categoryName: string } }
) {
  try {
    console.log('<<<<=== params : ', params);

    if (!params.categoryName) {
      return new NextResponse('Category name is required', { status: 400 });
    }

    const category = await prismadb.category.findFirst({
      where: { title: params.categoryName },
    });

    console.log('>>><<<< category from DB :', category);

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error('오류발생 :', err.message);
    console.error('스택 트레이스 :', err.stack);
    return new NextResponse('Internal error', { status: 500 });
  }
}
