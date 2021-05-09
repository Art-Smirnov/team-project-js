import debounce from 'lodash.debounce';
import './shared_scss/main.scss';

import './services/apiService.js';
import './services/countriesCodes.js';
import preloaderFactory from './services/placeholder/placeholder.js';
import ApiService from './services/apiService.js';
import getRefs from './services/get-refs.js';
import cardTmpl from './templates/card-list-item.hbs';
import renderSerchForm from './components/search-form/renderSearchForm.js';

const preloader = preloaderFactory('.lds-roller');
const apiService = new ApiService();
const refs = getRefs();

refs.input.addEventListener('input', debounce(onInputChange, 500));
// renderDefaultEvents();
renderEventsByQuery();
async function renderDefaultEvents() {
  preloader.show();

  clearGallery();
  const result = await apiService.fetchDefaultEvents();
  console.log(result);

  appendImagesMarkup(result);
  preloader.hide();
}

async function renderEventsByQuery() {
  preloader.show();

  clearGallery();
  const result = await apiService.fetchEventsByQuery();
  console.log(result);

  appendImagesMarkup(result);
  preloader.hide();
}

function appendImagesMarkup(events) {
  refs.cardList.insertAdjacentHTML('beforeend', cardTmpl(events));
}

function clearGallery() {
  refs.cardList.innerHTML = '';
}
