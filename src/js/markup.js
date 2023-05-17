import { lightbox } from '..';
import { refs } from './refs';

export function createMarkup(data) {
  return data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
         <a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b class="info-item_likes">Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b class="info-item_views">Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b class="info-item_comments">Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b class="info-item_downloads">Downloads</b>
        ${downloads}
      </p>
    </div>
  </div>`;
      }
    )
    .join('');
}

export function addMarkup(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
