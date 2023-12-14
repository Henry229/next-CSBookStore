import axios from 'axios';

export default async function GetItems() {
  try {
    const response = await axios.get(`http://localhost:3000/api/store/items`);
    return response.data;
  } catch (error) {
    console.error('Error fetching items data:', error);
    return null;
  }
}
