import axios from 'axios';

export default async function GetProductions(categoryId: string) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/store/products?categoryId=${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products data:', error);
    return null;
  }
}
