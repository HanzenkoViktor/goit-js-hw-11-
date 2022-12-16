import axios from 'axios';

export class API {
  constructor(query) {
    this.URL = 'https://pixabay.com/api/';
    this.API_KEY = '31947460-94dfdb2440a2031458268e436';
    this.query = query;
    this.page = 1;
  }

  async getPhotos() {
    const promise = await axios.get(
      `${this.URL}?key=${this.API_KEY}&q=${this.query}&image_type=photo&safesearch=true&orientation=horizontal&page=${this.page}&per_page=15`
    );
    return promise;
  }

  pageIncrement() {
    this.page += 1;
  }
}