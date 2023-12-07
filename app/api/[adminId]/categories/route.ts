import prismadb from '@/lib/prismadb';
import { auth, currentUser } from '@clerk/nextjs';
import { log } from 'console';
// import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
// import { NextResponse } from 'next/server';

// Fetch All Categories

export async function GET(req: NextRequest, res: NextResponse) {
  console.log('$$$$ app > api > [adminId] > categories > route.ts');

  try {
    const { userId } = auth();

    console.log('////userId////', userId);

    if (!userId) {
      // return res.status(401).json({ error: 'Unauthorized' });
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const categories = await prismadb.category.findMany({
      orderBy: { createdAt: 'desc' },
    });
    console.log('////categories////', categories);

    // return res.status(200).json(categories);
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    // return res.status(500).json({ error: 'Something went wrong!' });
    const err = error as Error;
    console.error('오류발생 :', err.message);
    console.error('스택 트레이스 :', err.stack);

    return NextResponse.json('Something went wrong!', { status: 500 });
    // return NextResponse.json('Something went wrong!', { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { userId } = await auth();
    // const body = await req.body;
    const body = await req.json();

    const { title } = body;

    console.log('+++@@@@body////', body);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized', status: 401 });
    }

    if (!title) {
      // return new NextResponse('Name is required', { status: 400 });
      return NextResponse.json({ error: 'Name is required', status: 400 });
    }

    const category = await prismadb.category.create({
      data: {
        title,
      },
    });

    // return new NextResponse(JSON.stringify(category), { status: 200 });
    // return res.status(200).json(category);
    return NextResponse.json({ category, status: 200 });
  } catch (error) {
    // return new NextResponse('Something went wrong!', { status: 500 });
    const err = error as Error;
    console.error('오류발생 :', err.message);
    console.error('스택 트레이스 :', err.stack);
    return NextResponse.json({ error: 'Something went wrong!', status: 500 });
  }
}
