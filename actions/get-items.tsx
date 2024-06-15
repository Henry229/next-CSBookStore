import axios from 'axios';

export default async function GetItems() {
  try {
    const response = await axios.get(
      `http://next-cs-book-store.vercel.app/api/store/items`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching items data:', error);
    return null;
  }
}
