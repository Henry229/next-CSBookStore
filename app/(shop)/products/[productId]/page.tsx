'use client';

import ProductList from '@/components/product-list';
import Gallery from '@/components/gallery';
import Info from '@/components/info';
import GetProduct from '@/actions/get-product';
import GetProductions from '@/actions/get-productions';
import Container from '@/components/ui/container';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/types';

export const revalidate = 0;

// interface ProductPageProps {
// productId: string;
// }

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  // if (!productId) {
  //   console.error('Product ID not found');
  //   return null;
  // }

  useEffect(() => {
    const fetchData = async () => {
      if (!productId) return;

      const fetchedProduct = await GetProduct(productId as string);
      setProduct(fetchedProduct);

      if (fetchedProduct?.category?.id) {
        const fetchedSuggestedProducts = await GetProductions(
          fetchedProduct.category.id
        );
        setSuggestedProducts(
          Array.isArray(fetchedSuggestedProducts)
            ? fetchedSuggestedProducts
            : [fetchedSuggestedProducts]
        );
      }
    };

    fetchData();
  }, [productId]);

  // useEffect(() => {
  //   async function fetchData() {
  //     if (productId) {
  //       const fetchedProduct = await GetProduct(productId as string);
  //       setProduct(fetchedProduct);

  //       if (fetchedProduct && fetchedProduct.category) {
  //         const fetchedSuggestedProducts = await GetProductions(
  //           fetchedProduct.category.id
  //         );
  //         console.log(
  //           '+++++_----- fetchedSuggestedProducts:',
  //           fetchedSuggestedProducts
  //         );
  //         if (Array.isArray(fetchedSuggestedProducts)) {
  //           setSuggestedProducts(fetchedSuggestedProducts);
  //         } else if (fetchedSuggestedProducts) {
  //           // 단일 객체를 배열로 변환
  //           setSuggestedProducts([fetchedSuggestedProducts]);
  //         // setSuggestedProducts(fetchedSuggestedProducts);
  //       }
  //     }
  //   }

  //   fetchData();
  // }, [productId]);

  // const getProduct = await GetProduct(productId as string);

  // const suggestedProducts = await GetProductions(getProduct.category.id);

  // if (!suggestedProducts) {
  //   return null;
  // }

  return (
    <div className='bg-white'>
      <Container>
        <div className='px-4 py-10 sm:px-6 lg:px-8'>
          {product && (
            <>
              <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
                <Gallery images={product.images} />
                <div className='px-4 mt-10 sm:mt-16 sm:px-0 lg:mt-0'>
                  <Info data={product} />
                </div>
              </div>
              <hr className='my-10' />
            </>
          )}
          {suggestedProducts && (
            <ProductList title='Related Items' items={suggestedProducts} />
          )}
        </div>
      </Container>
    </div>
  );
}
