import axios from 'axios';

export default async function GetCategory(categoryName: string) {
  try {
    const response = await axios.get(
      `http://next-cs-book-store.vercel.app/api/store/${categoryName}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching category data:', error);
    return null;
  }
}
