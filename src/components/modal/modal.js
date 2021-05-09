import ApiService from '../../services/apiService.js';
import getRefs from '../../services/get-refs';
import modalTmpl from '../../templates/card-list.hbs';

const apiService = new ApiService();
let currentID = '';
// const refs = getRefs();

// refs.overlay.insertAdjacentHTML('beforeend', modalTmpl());

console.log(getRefs().cardList);
getRefs().cardList.addEventListener('click', onClickCard);
refs.modal.addEventListener('click', onCloseModal);

async function onClickCard(e) {
  console.log(1);
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
  const result = await apiService.fetchDefaultEvents();

  for (const el of result) {
    if (el.id === currentID) {
      refs.modal.insertAdjacentHTML('beforeend', modalTmpl(el));
    }
  }
}

// function onCloseModal(e) {
//   if (e.target.nodeName !== 'BUTTON') {
//     return;
//   }
//   onToggleModal();
//   cleanInformationCard();
// }

// function onToggleModal() {
//   refs.modal.classList.toggle('is-hidden');
// }
