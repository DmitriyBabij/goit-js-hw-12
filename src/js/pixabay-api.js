import axios from 'axios';

const API_KEY = '47491725-6916c20f65c7c72c223d91484';
const BASE_URL = 'https://pixabay.com/api/';

let page = 1; // Початкове значення для пагінації

export async function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

export function incrementPage() {
  page += 1;
}

export function resetPage() {
  page = 1;
}