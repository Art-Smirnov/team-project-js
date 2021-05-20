import { paginationRender, clearPagList } from '../pagination/pagination';
import countryCodes from '../../services/countriesCodes.js';
import preloaderFactory from '../../services/placeholder/placeholder.js';
import ApiService from '../../services/apiService.js';
import getRefs from '../../services/get-refs.js';
import cardTmpl from '../../templates/card-list-item.hbs';
import renderSelectCountry from '../search-form/renderSearchForm.js';
import gameMarkup from '../tic-tac-toe/game-markup.js';
import { onClickCard } from '../modal/modal.js';
import { fetchLikedEvnts } from '../authentication/auth.js';

const preloader = preloaderFactory('.lds-roller');
const refs = getRefs();
const apiTag = ApiService.tag;
let idCategory;

console.log(refs.decors);

renderSelectCountry(countryCodes);
if (apiTag === undefined) {
  renderDefaultEvents();
}

refs.selectForm.addEventListener('change', onSelectCountry);
refs.form.addEventListener('submit', onInputChange);
refs.genre.addEventListener('click', searchEven);
refs.eventCurrentUsers.addEventListener('click', onClickMyEventsBtn);

function searchEven(e) {
  if (e.target.nodeName === 'P' || e.target.nodeName === 'IMG') {
    idCategory = e.target.dataset.genre;
  }
  sessionStorage.setItem('segmentId', idCategory);
  bySegment();
}

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
  sessionStorage.setItem('value', `${e.currentTarget.elements[0].value}`);
  byQuery();
}

async function bySegment(page = 0) {
  const segmentId = sessionStorage.getItem('segmentId');
  try {
    preloader.show();
    clearGallery();
    clearPagList();

    const result = await ApiService.feachEventBySegments(segmentId, page);

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

async function byQuery(page = 0) {
  const value = sessionStorage.getItem('value');
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

function onSelectCountry(e) {
  refs.cardList.addEventListener('click', onClickCard);
  refs.searchEventInp.value = '';
  const selectEl = e.target;
  const selectCountryCode = selectEl.options[selectEl.selectedIndex].value;
  sessionStorage.setItem('country', `${selectCountryCode}`);
  byCountry();
}

async function byCountry(page = 0) {
  const country = sessionStorage.getItem('country');
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

async function onClickMyEventsBtn(page = 0) {
  try {
    preloader.show();
    clearGallery();
    clearPagList();
    const result = await fetchLikedEvnts();

    console.log(result.length);
    appendImagesMarkup(result);
    paginationRender({ totalPages: 1 }, page);
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
  if (refs.cardList.children.length < 17) {
    refs.decors.forEach(el => el.classList.add('hide'));
  }
  if (refs.cardList.children.length > 17) {
    refs.decors.forEach(el => el.classList.remove('hide'));
  }
}

function clearGallery() {
  refs.cardList.innerHTML = '';
}

function onNoResultsError() {
  refs.cardList.removeEventListener('click', onClickCard);
  refs.cardList.insertAdjacentHTML('beforeend', gameMarkup());
  if (refs.cardList.children.length < 17) {
    refs.decors.forEach(el => el.classList.add('hide'));
  }
}

//Появление секции команды
refs.logoEl[0].addEventListener('click', e => {
  refs.genreEl.classList.toggle('show');
});

refs.logoEl[1].addEventListener('click', e => {
  refs.genreEl.classList.toggle('show');
});

export {
  renderDefaultEvents,
  byCountry,
  byQuery,
  clearGallery,
  bySegment,
  onClickMyEventsBtn,
};
