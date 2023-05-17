import axios from 'axios';

const API_KEY = 'key=36427900-70ae1c90a640d0a3e2de3b856';
const BASE_URL = 'https://pixabay.com/api/';
const DEFAULT_PARAMS = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

export default class SearchPhotos {
  #query = '';
  #totalPages = 0;
  #totalHits = 0;
  #page = 1;
  #per_page = 40;

  async getPhotos() {
    const url = `${BASE_URL}?${API_KEY}&q=${this.#query}&page=${
      this.#page
    }&per_page=${this.#per_page}&${DEFAULT_PARAMS}`;

    const { data } = await axios.get(url);
    console.log(data);
    return data;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }

  get query() {
    return this.#query;
  }

  get perPage() {
    return this.#per_page;
  }

  get currentPage() {
    return this.#page;
  }

  nextPage() {
    this.#page += 1;
  }

  clearPage() {
    this.#page = 1;
  }

  set totalHits(hitsValue) {
    this.#totalHits = hitsValue;
  }

  get totalHits() {
    return this.#totalHits;
  }

  calculateTotalpages() {
    this.#totalPages = Math.ceil(this.#totalHits / this.#per_page);
  }

  get totalPages() {
    return this.#totalPages;
  }
}
