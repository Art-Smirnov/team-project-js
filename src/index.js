import debounce from 'lodash.debounce';
import './shared_scss/main.scss';
import './services/apiService.js';
import './services/apiService.js';
import './components/modal/modal';
import './components/scroll-up/scroll_up';
import './components/search-more/search-more';

import countryCodes from './services/countriesCodes.js';
import preloaderFactory from './services/placeholder/placeholder.js';
import ApiService from './services/apiService.js';
import getRefs from './services/get-refs.js';
import cardTmpl from './templates/card-list-item.hbs';
import renderSelectCountry from './components/search-form/renderSearchForm.js';
// import modalWindow from './components/modal/modal.js';
const preloader = preloaderFactory('.lds-roller');
const apiService = new ApiService();
const refs = getRefs();
renderSelectCountry(countryCodes);
renderDefaultEvents();

refs.form.addEventListener('submit', onInputChange);

async function renderDefaultEvents() {
  preloader.show();

  clearGallery();

  const result = await apiService.fetchDefaultEvents();
  console.log(result);

  appendImagesMarkup(result);
  preloader.hide();
}

async function onInputChange(e) {
  e.preventDefault();
  console.log(e.currentTarget.elements.query.value);
  try {
    preloader.show();

    clearGallery();
    // apiService.query = e.target.value;
    const result = await apiService.fetchEventsByQuery(e.target.value);
    console.log(result);

    appendImagesMarkup(result);
  } catch (error) {
    // alert('Something went wrong! Please enter a more specific query!');
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
    apiService.setSelectedCountry(selectCountryCode);
    if (selectCountryCode == 'All') {
      const result = await apiService.fetchEventsInAllContries();
      appendImagesMarkup(result);
    } else if (selectCountryCode !== 'All') {
      const result = await apiService.fetchEventsByCountry();
      appendImagesMarkup(result);
    }
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
