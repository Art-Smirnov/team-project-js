import ApiService from '../../services/apiService.js';
import getRefs from '../../services/get-refs';
import modalTmpl from '../../templates/card-list.hbs';

const refs = getRefs();
let currentID = '';

getRefs().backdrop.insertAdjacentHTML('beforeend', modalTmpl());
getRefs().cardList.addEventListener('click', onClickCard);
getRefs().backdrop.addEventListener('click', onCloseModal);
window.addEventListener('keyup', onKeyModalEscClose);

async function onClickCard(e) {
  onToggleModal();

  if (e.target.nodeName === 'IMG' || e.target.nodeName === 'DIV') {
    currentID = e.target.parentElement.dataset.id;
  }
  if (e.target.nodeName === 'H3' || e.target.nodeName === 'P') {
    currentID = e.target.parentElement.parentElement.dataset.id;
  }
  if (e.target.nodeName === 'LI') {
    currentID = e.target.dataset.id;
  }

  const result = await ApiService.fetchDefaultEvents();

  for (const el of result) {
    if (el.id === currentID) {
      getRefs().backdrop.innerHTML = '';
      getRefs().backdrop.insertAdjacentHTML('beforeend', modalTmpl(el));
    }
  }
}

function onCloseModal(e) {
  console.dir(e.target);
  if (e.target.nodeName !== 'BUTTON' && e.target.className !== 'backdrop') {
    return;
  }
  onToggleModal();
}

function onToggleModal() {
  refs.backdrop.classList.toggle('is-hidden');
}

function onKeyModalEscClose(e) {
  if (e.key !== 'Escape') {
    return;
  }
  refs.backdrop.classList.add('is-hidden');
}
