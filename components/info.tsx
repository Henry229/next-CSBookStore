'use client';

import { ShoppingCart } from 'lucide-react';

import Currency from '@/components/ui/currency';
import MobileButton from '@/components/ui/mobile-button';
import { Product } from '@/types';
import useCart from '@/hooks/use-cart';

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  };

  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900'>{data.title}</h1>
      <div className='flex items-end justify-between mt-3'>
        <p className='text-2xl text-gray-900'>
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className='my-4' />
      <div className='flex flex-col gap-y-6'>
        <div className='flex items-center gap-x-4'>
          <h3 className='font-semibold text-black'>Item:</h3>
          <div>{data?.item?.value}</div>
        </div>
        <div className='flex items-center gap-x-4'>
          <h3 className='font-semibold text-black'>Subject:</h3>
          <div>{data?.subject?.value}</div>
        </div>
      </div>
      <div className='flex items-center mt-10 gap-x-3'>
        <MobileButton
          onClick={onAddToCart}
          className='flex items-center gap-x-2'
        >
          Add To Cart
          <ShoppingCart size={20} />
        </MobileButton>
      </div>
    </div>
  );
};

export default Info;
