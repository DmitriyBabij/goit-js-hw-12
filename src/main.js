import { fetchImages, incrementPage, resetPage } from './js/pixabay-api.js';
import { renderGallery, showNoResultsMessage, showLoadingIndicator, hideLoadingIndicator } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.search-form');
  const searchInput = document.querySelector('.search-input');
  const gallery = document.querySelector('.gallery');
  const loadMoreButton = document.createElement('button');
  loadMoreButton.textContent = 'Load more';
  loadMoreButton.classList.add('load-more', 'hidden');
  document.body.appendChild(loadMoreButton);

  loadMoreButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    showLoadingIndicator();
    
    try {
      const data = await fetchImages(query);
      
      if (data.hits.length === 0) {
        showNoResultsMessage();
        return;
      }

      renderGallery(data.hits);
      incrementPage();
      
      if (data.totalHits <= gallery.children.length) {
        loadMoreButton.classList.add('hidden');
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }

      const firstTwoCardsHeight = gallery.children[0]?.offsetHeight * 2 || 0;
      window.scrollBy({
        top: firstTwoCardsHeight,
        behavior: 'smooth',
      });

      searchInput.focus(); 

    } catch (error) {
      showNoResultsMessage();
    } finally {
      hideLoadingIndicator();
    }
  });

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

    gallery.innerHTML = '';
    resetPage();
    loadMoreButton.classList.add('hidden');
    
    showLoadingIndicator();
    
    try {
      const data = await fetchImages(query);
      
      if (data.hits.length === 0) {
        showNoResultsMessage();
        return;
      }

      renderGallery(data.hits);
      incrementPage();
      loadMoreButton.classList.remove('hidden');
      
      if (data.totalHits <= 15) {
        loadMoreButton.classList.add('hidden');
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
      
      searchInput.focus();
      
    } catch (error) {
      showNoResultsMessage();
    } finally {
      hideLoadingIndicator();
    }
  });
});



