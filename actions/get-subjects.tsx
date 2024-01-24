import axios from 'axios';

export default async function GetSubjects() {
  try {
    const response = await axios.get(
      `http://next-cs-book-store.vercel.app/api/store/subjects`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching subjects data:', error);
    return null;
  }
}
