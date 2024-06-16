import { NextRequest, NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
// import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(
  req: NextRequest,
  { params }: { params: { subjectId: string } }
) {
  try {
    if (!params.subjectId) {
      return NextResponse.json('Subject id is required', { status: 400 });
    }
    const item = await prismadb.subject.findUnique({
      where: { id: params.subjectId },
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
  { params }: { params: { subjectId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.subjectId) {
      return new NextResponse('Item id is required', { status: 400 });
    }

    const item = await prismadb.subject.delete({
      where: {
        id: params.subjectId,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.log('[SUBJECT_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { subjectId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { title, value } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!title) {
      return new NextResponse('Subject Title is required', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Subject Value is required', { status: 400 });
    }

    if (!params.subjectId) {
      return new NextResponse('subject id is required', { status: 400 });
    }

    const subject = await prismadb.subject.update({
      where: {
        id: params.subjectId,
      },
      data: {
        title,
        value,
      },
    });

    return NextResponse.json(subject);
  } catch (error) {
    console.log('[SUBJECT_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
