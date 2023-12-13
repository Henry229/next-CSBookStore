import GetCategory from '@/actions/get-category';
import GetProductions from '@/actions/get-productions';

export default async function BookPage() {
  const category = await GetCategory('Books');
  if (!category || !category.id) {
    console.error('Category not found');
    return null;
  }
  const products = await GetProductions(category.id);
  return (
    <>
      <div>{category.title}</div>
      <div>
        {products?.length > 0 ? products[0].title : 'No products found'}
      </div>
    </>
  );
}
