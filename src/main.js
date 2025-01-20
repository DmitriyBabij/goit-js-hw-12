import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showNoResultsMessage, showLoadingIndicator, hideLoadingIndicator } from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.search-form');
  const searchInput = document.querySelector('.search-input');
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();

   
    if (query === '') {
      iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search term.',
      });
      return;
    }

    // Очищаємо старі результати перед новим пошуком
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';  // Очищаємо галерею між запитами ul

    showLoadingIndicator();

    try {
      const data = await fetchImages(query);

    
      if (data.hits.length === 0) {
        showNoResultsMessage();
        return;
      }

      renderGallery(data.hits); 
    } catch (error) {
      showNoResultsMessage();
    } finally {
      hideLoadingIndicator();
    }
  });
});