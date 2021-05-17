import { paginationRender, clearPagList } from '../pagination/pagination';

import countryCodes from '../../services/countriesCodes.js';
import preloaderFactory from '../../services/placeholder/placeholder.js';
import ApiService from '../../services/apiService.js';
import getRefs from '../../services/get-refs.js';
import cardTmpl from '../../templates/card-list-item.hbs';
import renderSelectCountry from '../search-form/renderSearchForm.js';
import gameMarkup from '../tic-tac-toe/game-markup.js';
import onClickCard from '../modal/modal.js';

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
  refs.cardList.addEventListener('click', onClickCard);
  clearGallery();
  clearPagList();

  const result = await ApiService.fetchDefaultEvents(page);

  appendImagesMarkup(result._embedded.events);
  paginationRender(result.page, page);
  preloader.hide();
}

function onInputChange(e) {
  refs.cardList.addEventListener('click', onClickCard);
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
    console.log(error);
    clearGallery();
    onNoResultsError();
  } finally {
    preloader.hide();
  }
}

refs.selectForm.addEventListener('change', onSelectCountry);

function onSelectCountry(e) {
  refs.cardList.addEventListener('click', onClickCard);
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
    console.log(error);
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

function onNoResultsError() {
  refs.cardList.removeEventListener('click', onClickCard);
  refs.cardList.insertAdjacentHTML('beforeend', gameMarkup());
}

//Появление секции команды
refs.logoEl.addEventListener('click', e => {
  refs.dreamTeamEl.classList.toggle('show');
});

export { renderDefaultEvents, byCountry, byQuery };
