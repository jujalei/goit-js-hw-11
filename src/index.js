import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './js/refs';
import SearchPhotosAPI from './js/api';
import { createMarkup, addMarkup } from './js/markup';
import LoadMoreBtn from './js/LoadMoreBtn';
import { trackScroll, goTop } from './js/go-top-btn';

const searchPhotosAPI = new SearchPhotosAPI();
const loadMoreBtn = new LoadMoreBtn({
  selector: '#loadMore',
  isHidden: true,
});

export const lightbox = new SimpleLightbox('.photo-card a');

refs.form.addEventListener('submit', onFormSubmit);
loadMoreBtn.button.addEventListener('click', fetchNextPage);
refs.goTopBtn.addEventListener('click', goTop);
window.addEventListener('scroll', trackScroll);

async function onFormSubmit(evt) {
  evt.preventDefault();

  clearPage();

  const {
    elements: { searchQuery },
  } = evt.currentTarget;

  const searchValue = searchQuery.value.trim().toLowerCase();

  if (!searchValue) {
    Notiflix.Notify.failure('Enter the text');
    return;
  }

  searchPhotosAPI.query = searchValue;

  try {
    const data = await searchPhotosAPI.getPhotos();

    searchPhotosAPI.totalHits = data.totalHits;

    if (data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images..`);
    }

    refs.form.reset();

    const markup = createMarkup(data);
    addMarkup(markup);

    checkLoadMoreButtonVisibility();
    loadMoreBtn.show();
  } catch (error) {
    Notiflix.Notify.failure(error.message, 'Oops...something wrong');
    clearPage();
  }
}

function fetchNextPage() {
  loadMoreBtn.disable();

  searchPhotosAPI.nextPage();

  searchPhotosAPI
    .getPhotos()
    .then(data => {
      const markup = createMarkup(data);
      addMarkup(markup);
      loadMoreBtn.enable();
      checkLoadMoreButtonVisibility();
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message, 'Oops...something wrong');
      clearPage();
      loadMoreBtn.enable();
    });
}

function checkLoadMoreButtonVisibility() {
  const { totalHits, currentPage, perPage } = searchPhotosAPI;
  const totalLoadedImagesCount = currentPage * perPage;

  if (totalLoadedImagesCount < totalHits) {
    loadMoreBtn.enable();
  } else {
    loadMoreBtn.end();
  }
}

function clearPage() {
  searchPhotosAPI.resetPage();
  refs.gallery.innerHTML = '';
}
