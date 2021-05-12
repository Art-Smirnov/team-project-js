import getRefs from '../../services/get-refs';
import ApiService from '../../services/apiService.js';
import cardTmpl from '../../templates/card-list-item.hbs';

const refs = getRefs();

const apiService = new ApiService();


refs.moreButton.addEventListener('click', onSearchMore);

async function onSearchMore() {
  const nameEvent = refs.titleEvent.textContent;

  try {
    preloader.show();

    clearGallery();

    const result = await apiService.fetchEventsByQuery(nameEvent);

    appendImagesMarkup(result);
  } catch (error) {
    alert('Something went wrong! Please enter a more specific query!');
  } finally {
    preloader.hide();
  }
}

function appendImagesMarkup(events) {
  refs.cardList.insertAdjacentHTML('beforeend', cardTmpl(events));
}
function clearGallery() {
  refs.cardList.innerHTML = '';
}
