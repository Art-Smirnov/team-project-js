import ApiService from '../../services/apiService.js';
import modalTmpl from '../../templates/modal-event.hbs';
import getRefs from '../../services/get-refs';
import modalTimer from '../modal-timer/modal-timer.js';
import moment from 'moment';
import renderSelectAuthors from '../authorsSelect/renderSelectAuthors.js';
import { byQuery } from '../events-list/events-list.js';
import { writeUserData } from '../authentication/auth';
import { deleteEventFromDataLikeUser } from '../authentication/auth';

const refs = getRefs();
let currentID = '';

refs.backdrop.addEventListener('click', onCloseModal);
window.addEventListener('keyup', onKeyModalEscClose);
refs.backdrop.addEventListener('click', onClickLikeEventBtn);
refs.backdrop.addEventListener('click', onClickDeleteEventBtn);

async function onClickCard(e) {
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

    //Добавляю в объект ивента свойство с датой в нужном формате для гугл-календаря
    result.startGoogle = moment
      .utc(result.dates.start.dateTime)
      .startOf('day')
      .format('YYYYMMDD[T]HHmmss[Z]');
    result.endGoogle = moment
      .utc(result.dates.start.dateTime)
      .startOf('day')
      .format('YYYYMMDD[T]HHmmss[Z]');

    markupModalText(result);

    const selectAuthor = document.querySelector('.form-select-author');

    if (selectAuthor) {
      renderSelectAuthors(result._embedded.attractions, selectAuthor);
      selectAuthor.addEventListener('change', onSelectAuthor);
    }

    modalTimer(
      result.dates.start.dateTime
        ? result.dates.start.dateTime
        : result.dates.start.localDate,
    );
    const dots = document.querySelectorAll('.box-dots');
    dotsBlinker(dots);
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
    sessionStorage.setItem('value', nameEvent);

    onToggleModal();
    byQuery();
  }
}

function markupModalText(text) {
  refs.backdrop.insertAdjacentHTML('beforeend', modalTmpl());
  refs.backdrop.innerHTML = modalTmpl(text);
}

function onCloseModal(e) {
  if (
    e.target.className !== 'close-button' &&
    e.target.className !== 'backdrop' &&
    e.target.className !== 'material-icons material-icons-close'
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
  if (e.target.className !== 'material-icons material-icons-like') {
    return;
  }
  writeUserData(currentID);
}

function onClickDeleteEventBtn(e) {
  if (e.target.className !== 'material-icons material-icons-delete') {
    return;
  }
  deleteEventFromDataLikeUser(currentID);
}

function onSelectAuthor(e) {
  const selectEl = e.target;
  const authorSelect = selectEl.options[selectEl.selectedIndex].value;
  refs.selectForm.value = '';
  sessionStorage.setItem('value', authorSelect);
  byQuery();
  onToggleModal();
}

function dotsBlinker(dots) {
  setInterval(() => {
    dots.forEach(el => (el.style.opacity = 0));
  }, 700);
  setInterval(() => {
    dots.forEach(el => (el.style.opacity = 1));
  }, 1400);
}
export { onToggleModal, onClickCard, onCloseModal };
