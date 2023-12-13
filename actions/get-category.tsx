import axios from 'axios';

export default async function GetCategory(categoryName: string) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/store/${categoryName}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching category data:', error);
    return null;
  }
}
