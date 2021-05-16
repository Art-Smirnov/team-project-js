import './shared_scss/main.scss';
import './services/apiService.js';
import './services/apiService.js';
import './components/modal/modal';
import './components/scroll-up/scroll_up';
import './components/theme-switch/theme-switch';
import {
  paginationRender,
  clearPagList,
} from './components/pagination/pagination';

import countryCodes from './services/countriesCodes.js';
import preloaderFactory from './services/placeholder/placeholder.js';
import ApiService from './services/apiService.js';
import getRefs from './services/get-refs.js';
import cardTmpl from './templates/card-list-item.hbs';
import renderSelectCountry from './components/search-form/renderSearchForm.js';

import gameMarkup from './components/tic-tac-toe/game-markup.js';

// import modalWindow from './components/modal/modal.js';

const preloader = preloaderFactory('.lds-roller');
const refs = getRefs();
const APIQ = ApiService.tag;
renderSelectCountry(countryCodes);

if (APIQ === undefined) {
  renderDefaultEvents();
}

refs.form.addEventListener('submit', onInputChange);

async function renderDefaultEvents(page = 0) {
  preloader.show();
  clearGallery();
  clearPagList();

  const result = await ApiService.fetchDefaultEvents(page);

  appendImagesMarkup(result._embedded.events);
  paginationRender(result.page, page);
  preloader.hide();
}

function onInputChange(e) {
  e.preventDefault();
  refs.selectForm.value = '';
  localStorage.setItem('value', `${e.currentTarget.elements[0].value}`);
  byQuery();
}

async function byQuery(page = 0) {
  const value = localStorage.getItem('value');
  try {
    preloader.show();
    clearGallery();
    clearPagList();

    const result = await ApiService.fetchEventsByQuery(value, page);

    appendImagesMarkup(result._embedded.events);
    paginationRender(result.page, page);
  } catch (error) {
    alert('Something went wrong! Please enter a more specific query!');
    clearGallery();
    onNoResultsError();
  } finally {
    preloader.hide();
  }
}

refs.selectForm.addEventListener('change', onSelectCountry);

function onSelectCountry(e) {
  refs.searchEventInp.value = '';
  const selectEl = e.target;
  const selectCountryCode = selectEl.options[selectEl.selectedIndex].value;
  localStorage.setItem('country', `${selectCountryCode}`);
  byCountry();
}

async function byCountry(page = 0) {
  const country = localStorage.getItem('country');
  try {
    preloader.show();
    clearGallery();
    clearPagList();

    if (country == 'All') {
      const result = await ApiService.fetchEventsInAllContries(page);
      appendImagesMarkup(result._embedded.events);
      paginationRender(result.page, page);
    } else if (country !== 'All') {
      const result = await ApiService.fetchEventsByCountry(country, page);
      appendImagesMarkup(result._embedded.events);
      paginationRender(result.page, page);
    }
  } catch (error) {
    // alert('No events. Please choose other country!');
    clearGallery();
    onNoResultsError();
  } finally {
    preloader.hide();
  }
}

function appendImagesMarkup(events) {
  refs.cardList.innerHTML = cardTmpl(events);
}

function clearGallery() {
  refs.cardList.innerHTML = '';
}

export { renderDefaultEvents, byCountry, byQuery };

function onNoResultsError() {
  refs.cardList.insertAdjacentHTML('beforeend', gameMarkup());
}

//Появление секции команды
refs.logoEl.addEventListener('click', e => {
  refs.dreamTeamEl.classList.toggle('show');
});
