import ApiService from '../../services/apiService.js';
import modalTmpl from '../../templates/modal-event.hbs';
import cardTmpl from '../../templates/card-list-item.hbs';
import getRefs from '../../services/get-refs';
import preloaderFactory from '../../services/placeholder/placeholder';
import renderSelectAuthors from '../authorsSelect/renderSelectAuthors.js';

const preloader = preloaderFactory('.lds-roller');
const refs = getRefs();

refs.backdrop.insertAdjacentHTML('beforeend', modalTmpl());
refs.backdrop.addEventListener('click', onCloseModal);
window.addEventListener('keyup', onKeyModalEscClose);

export default async function onClickCard(e) {
  // console.log(e.target.classList.contains('card-list'));
  // console.log(e.target.classList.contains('card-list-item'));
  if (e.target.classList.contains('card-list')) {
    return;
  }
  let currentID = '';

  onToggleModal();
  removeScroll();
  try {
    if (e.target.classList.contains('card-list-item')) {
      currentID = e.target.dataset.id;
    }
    if (e.target.nodeName === 'IMG' || e.target.nodeName === 'DIV') {
      currentID = e.target.parentElement.dataset.id;
    }
    if (e.target.nodeName === 'H3' || e.target.nodeName === 'P') {
      currentID = e.target.parentElement.parentElement.dataset.id;
    }

    // console.log(result._embedded.attractions);

    // renderSelectAuthors(result._embedded.attractions);

    const result = await ApiService.feachEventById(currentID);
    markupModalText(result);
  } catch (error) {
    console.log(error);
  }

  //search Event
  const moreButtonRef = document.querySelector('.button-more-grop');
  moreButtonRef.addEventListener('click', onSearchMore);

  async function onSearchMore(e) {
    let nameEvent;
    if (e.target.nodeName === 'DIV') {
      return;
    }

    if (e.target.nodeName === 'BUTTON') {
      nameEvent = e.target.firstElementChild.textContent;
    }
    if (e.target.nodeName === 'SPAN') {
      nameEvent = e.target.textContent;
    }
    console.log(nameEvent);

    onToggleModal();
    preloader.show();
    try {
      clearGallery();
      const result = await ApiService.fetchEventsByQuery(nameEvent);
      appendImagesMarkup(result._embedded.events);
    } catch (error) {
      alert('Something went wrong! Please enter a more specific query!');
    } finally {
      preloader.hide();
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    console.log(refs);
  });
}

function markupModalText(text) {
  refs.backdrop.innerHTML = modalTmpl(text);
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
function appendImagesMarkup(events) {
  refs.cardList.innerHTML = cardTmpl(events);
}
function clearGallery() {
  refs.cardList.innerHTML = '';
}
