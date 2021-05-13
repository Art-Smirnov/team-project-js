import './shared_scss/main.scss';
import './services/apiService.js';
import './services/apiService.js';
import './components/modal/modal';
import './components/scroll-up/scroll_up';
import './components/theme-switch/theme-switch';

import countryCodes from './services/countriesCodes.js';
import preloaderFactory from './services/placeholder/placeholder.js';
import ApiService from './services/apiService.js';
import getRefs from './services/get-refs.js';
import cardTmpl from './templates/card-list-item.hbs';
import renderSelectCountry from './components/search-form/renderSearchForm.js';
import gameMarkup from './components/tic-tac-toe/game-markup.js';
console.log(gameMarkup());
// import modalWindow from './components/modal/modal.js';
const preloader = preloaderFactory('.lds-roller');
const refs = getRefs();
renderSelectCountry(countryCodes);
renderDefaultEvents();

refs.form.addEventListener('submit', onInputChange);

async function renderDefaultEvents() {
  preloader.show();
  clearGallery();

  const result = await ApiService.fetchDefaultEvents();

  appendImagesMarkup(result);
  preloader.hide();
}

async function onInputChange(e) {
  e.preventDefault();

  try {
    preloader.show();

    clearGallery();

    const result = await ApiService.fetchEventsByQuery(
      e.currentTarget.elements[0].value,
    );
    console.log(result);

    appendImagesMarkup(result);
  } catch (error) {
    // alert('Something went wrong! Please enter a more specific query!');
    clearGallery();
    onNoResultsError();
  } finally {
    preloader.hide();
  }
}

refs.selectForm.addEventListener('change', onSelectCountry);

async function onSelectCountry(e) {
  try {
    preloader.show();

    clearGallery();
    let selectEl = e.target;
    let selectCountryCode = selectEl.options[selectEl.selectedIndex].value;
    if (selectCountryCode == 'All') {
      const result = await ApiService.fetchEventsInAllContries();
      console.log(result);
      appendImagesMarkup(result.events);
    } else if (selectCountryCode !== 'All') {
      const result = await ApiService.fetchEventsByCountry(selectCountryCode);
      appendImagesMarkup(result.events);
      console.log(result);
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

function onNoResultsError() {
  refs.cardList.insertAdjacentHTML('beforeend', gameMarkup())
}

//Появление секции команды
refs.logoEl.addEventListener('click', (e) => {
  refs.dreamTeamEl.classList.toggle('show');
})
