'use strict';

import './shared_scss/main.scss';
import './services/scrollUp/scrollUp';
import './services/apiService.js';
import './services/countriesCodes.js';
import preloaderFactory from './services/placeholder/placeholder.js';
import ApiService from './services/apiService.js';
import getRefs from './services/get-refs.js';
import cardTmpl from './templates/card-list-item.hbs';

const preloader = preloaderFactory('.lds-roller');
const apiService = new ApiService();
const refs = getRefs();

renderDefaultEvents();

async function renderDefaultEvents() {
  preloader.show();
  const result = await apiService.fetchDefaultEvents();
  console.log(result);

  appendImagesMarkup(result);
  preloader.hide();
}
function appendImagesMarkup(events) {
  refs.cardList.insertAdjacentHTML('beforeend', cardTmpl(events));
}
