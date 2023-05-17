import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './js/refs';
import SearchPhotosAPI from './js/api';
import { createMarkup, addMarkup } from './js/markup';

const searchPhotosAPI = new SearchPhotosAPI();
export const lightbox = new SimpleLightbox('.photo-card a');
