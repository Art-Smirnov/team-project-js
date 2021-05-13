import ApiService from '../../services/apiService.js';
import getRefs from '../../services/get-refs';
import modalTmpl from '../../templates/modal-event.hbs';
import cardTmpl from '../../templates/card-list-item.hbs';

import preloaderFactory from '../../services/placeholder/placeholder';

const preloader = preloaderFactory('.lds-roller');
const refs = getRefs();

refs.backdrop.insertAdjacentHTML('beforeend', modalTmpl());
refs.cardList.addEventListener('click', onClickCard);
refs.backdrop.addEventListener('click', onCloseModal);
window.addEventListener('keyup', onKeyModalEscClose);

async function onClickCard(e) {
  if (e.target.nodeName === 'UL') {
    return;
  }
  if (e.target.nodeName === 'LI') {
    return;
  }
  console.log(e.target.nodeName);
  let currentID = '';
  onToggleModal();
  removeScroll();

  if (e.target.nodeName === 'IMG' || e.target.nodeName === 'DIV') {
    currentID = e.target.parentElement.dataset.id;
  }
  if (e.target.nodeName === 'H3' || e.target.nodeName === 'P') {
    currentID = e.target.parentElement.parentElement.dataset.id;
  }

  const result = await ApiService.feachEventById(currentID);
  cleanModal();

  markupModalText(result);

  //search Event
  const moreButtonRef = document.querySelector('.modal-button-more');

  moreButtonRef.addEventListener('click', onSearchMore);

  async function onSearchMore() {
    const eventName = document.querySelector('.title-event').textContent;
    onToggleModal();
    preloader.show();
    try {
      clearGallery();

      const result = await ApiService.fetchEventsByQuery(eventName);
      appendImagesMarkup(result);
    } catch (error) {
      alert('Something went wrong! Please enter a more specific query!');
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
}

function markupModalText(text) {
  refs.backdrop.insertAdjacentHTML('beforeend', modalTmpl(text));
}

function cleanModal() {
  refs.backdrop.innerHTML = '';
}

function onCloseModal(e) {
  if (
    e.target.className !== 'close-button' &&
    e.target.className !== 'backdrop'
  ) {
    return;
  }
  onToggleModal();
}

function onToggleModal() {
  refs.backdrop.classList.toggle('is-hidden');
}

function removeScroll() {
  if (refs.scroll.classList.contains('back_to_top-show')) {
    refs.scroll.classList.remove('back_to_top-show');
  }
}

function onKeyModalEscClose(e) {
  if (e.key !== 'Escape') {
    return;
  }
  refs.backdrop.classList.add('is-hidden');
}
