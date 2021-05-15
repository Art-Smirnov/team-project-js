import ApiService from '../../services/apiService.js';
import getRefs from '../../services/get-refs';
import modalTmpl from '../../templates/modal-event.hbs';
import cardTmpl from '../../templates/card-list-item.hbs';

import preloaderFactory from '../../services/placeholder/placeholder';
import {LikeEvent} from '../authentication/like-event'

const preloader = preloaderFactory('.lds-roller');
const refs = getRefs();
let currentID = '';

refs.backdrop.insertAdjacentHTML('beforeend', modalTmpl());
refs.backdrop.addEventListener('click', onCloseModal);
window.addEventListener('keyup', onKeyModalEscClose);
refs.backdrop.addEventListener('click', onClickLikeEventBtn);


export default async function onClickCard(e) {
  try {
    if (e.target.nodeName === 'UL' || e.target.nodeName === 'LI') {
      return;
    }


    onToggleModal();
    removeScroll();

    if (e.target.nodeName === 'IMG' || e.target.nodeName === 'DIV') {
      currentID = e.target.parentElement.dataset.id;
    }
    if (e.target.nodeName === 'H3' || e.target.nodeName === 'P') {
      currentID = e.target.parentElement.parentElement.dataset.id;
    }

    const result = await ApiService.feachEventById(currentID);
    console.log(result);
    cleanModal();

    markupModalText(result);
  } catch (error) {
    console.log(error);
  }

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


// myyyyyyyyyy
function onClickLikeEventBtn(e) {
    if (e.target.className !== 'like-event') {
        return
  }
  e.target.classList.toggle('current-like');
  console.log(currentID);
  const idLikeEvent = {
    idLike: currentID
  }
  //запрос на сервер с добавлением айди ивента
  LikeEvent.create(idLikeEvent)
  
}