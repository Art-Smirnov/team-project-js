import debounce from 'lodash.debounce';
import './shared_scss/main.scss';
import './services/apiService.js';
import './services/apiService.js';
import './components/modal/modal';

import preloaderFactory from './services/placeholder/placeholder.js';
import ApiService from './services/apiService.js';
import getRefs from './services/get-refs.js';
import cardTmpl from './templates/card-list-item.hbs';
import renderSerchForm from './components/search-form/renderSearchForm.js';

const preloader = preloaderFactory('.lds-roller');
const apiService = new ApiService();
const refs = getRefs();

renderDefaultEvents();

refs.searchEventInp.addEventListener('input', debounce(onInputChange, 500));

async function renderDefaultEvents() {
  preloader.show();

  clearGallery();

  const result = await apiService.fetchDefaultEvents();
  console.log(result);

  appendImagesMarkup(result);
  preloader.hide();
}

async function onInputChange(e) {
  try {
    preloader.show();

    clearGallery();
    apiService.query = e.target.value;
    const result = await apiService.fetchEventsByQuery();
    console.log(result);

    appendImagesMarkup(result);
  } catch (error) {
    alert('Something went wrong! Please enter a more specific query!');
  } finally {
    preloader.hide();
  }
}

getRefs().selectForm.addEventListener('change', onSelectCountry);

async function onSelectCountry(e) {
  try {
    preloader.show();

    clearGallery();

    let selectEl = e.target;
    let selectCountryCode = selectEl.options[selectEl.selectedIndex].value;

    const result = await apiService.fetchEventsByCountry(selectCountryCode);
    console.log(result);

    appendImagesMarkup(result);
  } catch (error) {
    alert('No events. Please choose other country!');
  } finally {
    preloader.hide();
  }
}

function appendImagesMarkup(events) {
  refs.cardList.insertAdjacentHTML('beforeend', cardTmpl(events));
}

function clearGallery() {
  refs.cardList.innerHTML = '';
}
