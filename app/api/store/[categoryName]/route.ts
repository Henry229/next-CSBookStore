import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { categoryName: string } }
) {
  try {
    if (!params.categoryName) {
      return new NextResponse('Category name is required', { status: 400 });
    }

    const category = await prismadb.category.findFirst({
      where: { title: params.categoryName },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error('Error message :', err.message);
    console.error('Stack Trace :', err.stack);
    return new NextResponse('Internal error', { status: 500 });
  }
}
