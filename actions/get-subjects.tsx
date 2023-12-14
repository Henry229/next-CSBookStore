import axios from 'axios';

export default async function GetSubjects() {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/store/subjects`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching subjects data:', error);
    return null;
  }
}
