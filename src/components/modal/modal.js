import ApiService from '../../services/apiService.js';
import getRefs from '../../services/get-refs';
import modalTmpl from '../../templates/card-list.hbs';

const apiService = new ApiService();
let currentID = '';

getRefs().backdrop.insertAdjacentHTML('beforeend', modalTmpl());
getRefs().cardList.addEventListener('click', onClickCard);
getRefs().modal.addEventListener('click', onCloseModal);

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

  const result = await apiService.fetchDefaultEvents();

  for (const el of result) {
    if (el.id === currentID) {
      getRefs().modal.insertAdjacentHTML('beforeend', modalTmpl(el));
    }
  }
}

function onCloseModal(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  onToggleModal();
}

function onToggleModal() {
  getRefs().backdrop.classList.toggle('is-hidden');
}

window.addEventListener('keyup', onKeyModalEscClose);

function onKeyModalEscClose(e) {
  if (e.key !== 'Escape') {
    return;
  }
  getRefs().backdrop.classList.add('is-hidden');
}


// function onImageClick(e) {
//     const image = e.target;

// }

// async function openModal(e) {
//     e.preventDefault();
//     // const image = e.target;
//     if (e.target.localName === 'img') {
//         getRefs.overlay.classList.add('is-open')
//         const result = await apiService.fetchDefaultEvents();
//         modalMarkup(result)
//             // modalImgRef.src = e.target.dataset.source;
//   }
//   for (let el of markup) {
//     if (el.includes(e.target.src)) {
//       activeIndex = markup.indexOf(el);
//     }
//   }
// }
// getFetch()
// async function gaeFetch() {
//   const result = await apiService.fetchDefaultEvents();
//   console.log(result);
// }
// function modalMarkup(events) {
//   getRefs.overlayModal.insertAdjacentHTML('beforeend', windwTmpl(events));
// }
// const result = await apiService.fetchDefaultEvents()
// console.log(result);

// modalMarkup(result)
// console.log(getRefs.cardList);
// console.log('2356');