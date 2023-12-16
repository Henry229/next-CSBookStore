import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  const productId = params.productId;
  // console.log('??????req.query :', req.query);
  // const { productId } = req.query;

  try {
    // const url = new URL(req.url, `http://${req.headers.get('host')}`);
    // const productId = url.searchParams.get('productId');

    if (!productId) {
      // return res.status(401).json({ message: 'Product id is required' });
      return new NextResponse('Product id is required', { status: 400 });
    }

    const products = await prismadb.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
        item: true,
        subject: true,
        images: true,
      },
    });

    // return res.status(200).json(products);
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error('Error Message :', err.message);
    console.error('Stack Trace :', err.stack);
    // return res.status(500).json({ message: 'Internal error' });
    return new NextResponse('Internal error', { status: 500 });
  }
}
