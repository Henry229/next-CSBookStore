import axios from 'axios';

export default async function GetProduct(productId: string) {
  try {
    const response = await axios.get(
      `http://next-cs-book-store.vercel.app/api/store/products/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products data:', error);
    return null;
  }
}
