import prismadb from '@/lib/prismadb';
import { auth, currentUser, useUser } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Fetch All Categories

export async function GET() {
  try {
    console.log('>>>>currentUser: ', currentUser());

    const user = currentUser();
    // const { userId } = auth();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const categories = await prismadb.category.findMany();
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new NextResponse('Something went wrong!', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    console.log('>>>>body: ', body);

    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const category = await prismadb.category.create({
      data: {
        title: name,
      },
    });

    return new NextResponse(JSON.stringify(category), { status: 200 });
  } catch (error) {
    return new NextResponse('Something went wrong!', { status: 500 });
  }
}
