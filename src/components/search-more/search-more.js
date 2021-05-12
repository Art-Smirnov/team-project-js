import getRefs from '../../services/get-refs';
import ApiService from '../../services/apiService.js';
import cardTmpl from '../../templates/card-list-item.hbs';

const refs = getRefs();

refs.moreButton.addEventListener('click', () => {
  console.log(1);
});

// async function onSearchMore() {
//   const nameEvent = refs.titleEvent.textContent;

//   try {
//     preloader.show();

//     clearGallery();

//     const result = await ApiService.fetchEventsByQuery(nameEvent);

//     appendImagesMarkup(result);
//   } catch (error) {
//     alert('Something went wrong! Please enter a more specific query!');
//   } finally {
//     preloader.hide();
//   }
// }

// function appendImagesMarkup(events) {
//   refs.cardList.innerHTML = cardTmpl(events);
// }
// function clearGallery() {
//   refs.cardList.innerHTML = '';
// }
