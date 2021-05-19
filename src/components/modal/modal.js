import ApiService from '../../services/apiService.js';
import modalTmpl from '../../templates/modal-event.hbs';
import getRefs from '../../services/get-refs';
import modalTimer from '../modal-timer/modal-timer.js';
import renderSelectAuthors from '../authorsSelect/renderSelectAuthors.js';
import { byQuery } from '../events-list/events-list.js';
import { writeUserData } from '../authentication/auth';
import { deleteEventFromDataLikeUser } from '../authentication/auth';

const refs = getRefs();
let currentID = '';

refs.backdrop.insertAdjacentHTML('beforeend', modalTmpl());
refs.backdrop.addEventListener('click', onCloseModal);
window.addEventListener('keyup', onKeyModalEscClose);
refs.backdrop.addEventListener('click', onClickLikeEventBtn);
refs.backdrop.addEventListener('click', onClickDeleteEventBtn);

export default async function onClickCard(e) {
  if (e.target.classList.contains('card-list')) {
    return;
  }

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

    const result = await ApiService.feachEventById(currentID);
    markupModalText(result);

    const selectAuthor = document.querySelector('.form-select-author');

    if (selectAuthor) {
      renderSelectAuthors(result._embedded.attractions, selectAuthor);
      selectAuthor.addEventListener('change', onSelectAuthor);
    }
    modalTimer(result.dates.start.dateTime);
  } catch (error) {
    console.log(error);
  }

  //search Event
  const moreButtonRef = document.querySelector('.modal-button-more');
  if (moreButtonRef) {
    moreButtonRef.addEventListener('click', onSearchMore);
  }

  async function onSearchMore(e) {
    let nameEvent;

    if (e.target.nodeName === 'BUTTON') {
      nameEvent = e.target.firstElementChild.textContent;
    }
    if (e.target.nodeName === 'SPAN') {
      nameEvent = e.target.textContent;
    }
    localStorage.setItem('value', nameEvent);

    onToggleModal();
    byQuery();
  }
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
  refs.bodyRef.classList.toggle('modal-open');
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

// database
function onClickLikeEventBtn(e) {
  if (e.target.className !== 'like-event') {
    return;
  }
  e.target.classList.toggle('current-like');
  writeUserData(currentID);
}

function onClickDeleteEventBtn(e) {
  if (e.target.className !== 'delete-event') {
    return;
  }
  deleteEventFromDataLikeUser(currentID);
}

function onSelectAuthor(e) {
  const selectEl = e.target;
  const authorSelect = selectEl.options[selectEl.selectedIndex].value;
  refs.selectForm.value = '';
  localStorage.setItem('value', authorSelect);
  byQuery();
  onToggleModal();
}
