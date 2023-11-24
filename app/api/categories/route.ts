import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = currentUser();

  if (!user) {
    return new NextResponse(null, { status: 401 });
  }
  return new NextResponse('Hello from API route!', { status: 200 });
}
