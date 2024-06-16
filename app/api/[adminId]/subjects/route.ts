import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { adminId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { title, value } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!title) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Value is required', { status: 400 });
    }

    if (!params.adminId) {
      return new NextResponse('Admin id is required', { status: 400 });
    }

    const subject = await prismadb.subject.create({
      data: {
        title,
        value,
      },
    });

    return NextResponse.json(subject);
  } catch (error) {
    console.log('[SUBJECTS_POST]', error);
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
