import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const items = await prismadb.item.findMany({});

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error('Error message :', err.message);
    console.error('Stack Trace :', err.stack);
    return new NextResponse('Internal error', { status: 500 });
  }
}
