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

  const scrollToTopButton = document.createElement('button');
  scrollToTopButton.id = 'scrollToTop';
  scrollToTopButton.textContent = '⬆️ Повернутися нагору';
  scrollToTopButton.classList.add('hidden');
  document.body.appendChild(scrollToTopButton);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopButton.style.display = 'block';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  });

  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

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

      window.scrollBy({
        top: document.querySelector('.gallery').getBoundingClientRect().height * 2,
        behavior: 'smooth',
      });

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

    // Очищаємо старі результати перед новим пошуком
    gallery.innerHTML = '';  // Очищаємо галерею
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

      window.scrollTo({
        top: form.offsetTop,
        behavior: 'smooth',
      });
    } catch (error) {
      showNoResultsMessage();
    } finally {
      hideLoadingIndicator();
    }
  });
});






