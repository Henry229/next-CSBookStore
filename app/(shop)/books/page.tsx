import GetCategory from '@/actions/get-category';
import GetProductions from '@/actions/get-productions';
import Container from '@/components/ui/container';
import BooksHero from '@/components/ui/book-hero';
import MobileFilters from './components/mobile-filters';
import GetItems from '@/actions/get-items';
import GetSubjects from '@/actions/get-subjects';
import Filter from './components/filter';
import NoResults from '@/components/ui/no-results';
import ProductCard from '@/components/ui/product-card';
import { Product } from '@/types';
import { useSearchParams } from 'next/navigation';

// interface ExtendedProduct extends PrismaProduct {
//   category: { title: string } | null;
//   item: { title: string } | null;
//   subject: { title: string } | null;
//   images: { url: string }[];
// }

interface BookPageProps {
  searchParams: {
    itemId: string;
    subjectId: string;
  };
}

export default async function BookPage({
  searchParams: { itemId, subjectId },
}: BookPageProps) {
  const category = await GetCategory('Books');
  if (!category || !category.id) {
    console.error('Category not found');
    return null;
  }
  const items = await GetItems();
  const subjects = await GetSubjects();
  // console.log('======= searchParams', searchParams);

  const products: Product[] = await GetProductions(
    category.id,
    itemId,
    subjectId
  );
  console.log('======= products', products);

  return (
    <div className='bg-white'>
      <Container>
        <BooksHero />
        <div className='px-4 pb-24 sm:px-6 lg:px-8'>
          <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
            <MobileFilters items={items} subjects={subjects} />
            <div className='hidden lg:block'>
              <Filter valueKey='itemId' name='Items' data={items} />
              <Filter valueKey='subjectId' name='Subjects' data={subjects} />
            </div>
            <div className='mt-6 lg:col-span-4 lg:mt-0'>
              {products.length === 0 && <NoResults />}
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
