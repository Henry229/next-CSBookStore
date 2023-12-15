import axios from 'axios';

export default async function GetProductions(
  categoryId: string,
  itemId?: string,
  subjectId?: string
) {
  try {
    const params = new URLSearchParams({ categoryId });

    if (itemId) params.append('itemId', itemId);
    if (subjectId) params.append('subjectId', subjectId);

    console.log('>>>>>----- params in get-productions : ', params);

    const response = await axios.get(
      `http://localhost:3000/api/store/products?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products data:', error);
    return null;
  }
}
