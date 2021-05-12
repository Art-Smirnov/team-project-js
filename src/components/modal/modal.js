import ApiService from '../../services/apiService.js';
import getRefs from '../../services/get-refs';
import modalTmpl from '../../templates/modal-events.hbs';

const refs = getRefs();

refs.backdrop.insertAdjacentHTML('beforeend', modalTmpl());
refs.cardList.addEventListener('click', onClickCard);
refs.backdrop.addEventListener('click', onCloseModal);
window.addEventListener('keyup', onKeyModalEscClose);

async function onClickCard(e) {
  let currentID = '';
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

  const result = await ApiService.feachEventById(currentID);

  refs.backdrop.innerHTML = '';
  refs.backdrop.insertAdjacentHTML('beforeend', modalTmpl(result));
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