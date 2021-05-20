import getRefs from '../../services/get-refs.js';
import { clearGallery } from '../events-list/events-list.js';
import devCardTmpl from '../../templates/developer-card-markup.hbs';
import developers from './developers.js';
import { paginationRender, clearPagList } from '../pagination/pagination';
import { onCloseModal, onClickCard } from '../modal/modal.js';

const refs = getRefs();

refs.developersLink.addEventListener('click', renderDevelopersList);

function renderDevelopersList() {
  clearGallery();
  clearPagList();
  refs.cardList.insertAdjacentHTML('afterbegin', devCardTmpl(developers));
  refs.cardList.removeEventListener('click', onCloseModal);
  refs.cardList.removeEventListener('click', onClickCard);
}