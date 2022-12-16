import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { API } from './js/api';
import { cardTemplate } from './js/card-template';
import { LoadMore } from './js/load-more';
import { message } from './js/message';
import { scroll } from './js/scroll';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
  themeSwitcher: document.querySelector('.theme-switch__toggle'),
};

const loadMore = new LoadMore(refs.loadMore);

let api = null;
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMore.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(e) {
  e.preventDefault();

  const query = e.target.searchQuery.value;
  if (api !== null && query === api.query && api.page === 1) return;
  refs.gallery.innerHTML = '';
  loadMore.removeMessage();
  loadMore.loadingVisible();

  api = new API(query);
  api.page = 1;

  const data = await createData();

  if (!data) return;
  render(data);
  loadMore.loadingHidden();
  lightbox.refresh();
  loadMore.loadingHidden();
  if (data.totalHits <= refs.gallery.children.length)
    loadMore.stopLoad(message);
}

async function createData() {
  try {
    return await fetchPhotos();
  } catch (error) {
    console.log(error.message);
  }
}

async function fetchPhotos() {
  return await api
    .getPhotos()
    .then(async resp => {
      const data = await resp.data;
      if (data.hits.length < 1) throw Error();
      return data;
    })
    .catch(error => {
      message.failure();
      loadMore.stopLoad();
    });
}

function render({ totalHits, hits }) {
  const template = hits.map(cardTemplate).join('');
  if (api.page === 1) {
    message.success(totalHits);
    refs.gallery.innerHTML = template;
    return;
  }
  refs.gallery.insertAdjacentHTML('beforeend', template);
}

async function onLoadMoreClick() {
  if (!api) return;
  loadMore.loadingVisible();
  api.pageIncrement();

  const data = await createData();

  render(data);
  scroll(refs.gallery);
  lightbox.refresh();
  loadMore.loadingHidden();

  if (data.totalHits <= refs.gallery.children.length)
    loadMore.stopLoad(message);
}
