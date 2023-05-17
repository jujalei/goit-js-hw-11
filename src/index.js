import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './js/refs';
import SearchPhotos from './js/api';

const searchPhotos = new SearchPhotos();

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 1,
};
