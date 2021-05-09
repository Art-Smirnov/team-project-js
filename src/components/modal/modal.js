import ApiService from './services/apiService.js';
import getRefs from './services/get-refs.js';
import windwTmpl from './templates/card-list.hbs';
const apiService = new ApiService();

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
function modalMarkup(events) {
  getRefs.overlayModal.insertAdjacentHTML('beforeend', windwTmpl(events));
}
const result = await apiService.fetchDefaultEvents()
console.log(result);

modalMarkup(result)
console.log(getRefs.cardList);
console.log('2356');