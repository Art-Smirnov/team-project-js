import getRefs from '../../services/get-refs.js';
import { clearGallery } from '../events-list/events-list.js';
import devCardTmpl from '../../templates/developer-card-markup.hbs';
import developers from './developers.js';
import { paginationRender, clearPagList } from '../pagination/pagination';
import { onCloseModal, onClickCard } from '../modal/modal.js';

const refs = getRefs();

refs.developersLink.addEventListener('click', renderDevelopersList);

function renderDevelopersList() {
  window.scrollTo(0, 0);

    clearPagList();


  refs.cardList.innerHTML = devCardTmpl(developers)
  // refs.cardList.insertAdjacentHTML('afterbegin', devCardTmpl(developers));
  refs.cardList.removeEventListener('click', onCloseModal);
  refs.cardList.removeEventListener('click', onClickCard);

  if (refs.cardList.children.length < 17) {
    refs.decors.forEach(el => el.classList.add('hide'));
  }
  if (refs.cardList.children.length > 17) {
    refs.decors.forEach(el => el.classList.remove('hide'));
  }
}

