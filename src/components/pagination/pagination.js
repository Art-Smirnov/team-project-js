import {
  renderDefaultEvents,
  byCountry,
  byQuery,
  bySegment,
} from '../events-list/events-list';
import ApiService from '../../services/apiService';
import getRefs from '../../services/get-refs.js';
const refs = getRefs();
refs.pagList.addEventListener('click', onClick);

function paginationRender({ totalPages }, currentPage) {
  const totalPaginationPages = totalPages < 50 ? totalPages : 50;
  const secondItemLogic = currentPage - 2 > 2 ? '...' : '2';
  const thirdItemLogic =
    currentPage < 5
      ? '3'
      : totalPaginationPages - 5 < currentPage
      ? totalPaginationPages - 6
      : currentPage - 2;
  const fourthItemLogic =
    currentPage < 5
      ? '4'
      : totalPaginationPages - 4 <= currentPage
      ? totalPaginationPages - 5
      : currentPage - 1;
  const fifthItemLogic =
    currentPage < 5
      ? '5'
      : totalPaginationPages - 5 < currentPage
      ? totalPaginationPages - 4
      : currentPage;
  const sixthItemLogic =
    currentPage < 5
      ? '6'
      : totalPaginationPages - 5 < currentPage
      ? totalPaginationPages - 3
      : currentPage + 1;
  const seventhItemLogic =
    currentPage < 5
      ? '7'
      : totalPaginationPages - 5 < currentPage
      ? totalPaginationPages - 2
      : currentPage + 2;
  const eightItemLogic =
    currentPage + 4 < totalPaginationPages ? '...' : totalPaginationPages - 1;

  if (totalPaginationPages <= 9) {
    const arr = [];

    for (let i = 1; i <= totalPaginationPages; i += 1) {
      arr.push(`<li class="pag__item">${i}</li>`);
    }
    const fullArr = arr.join('');
    refs.pagList.insertAdjacentHTML('beforeend', fullArr);
  }
  if (totalPaginationPages > 9) {
    refs.pagList.insertAdjacentHTML(
      'beforeend',
      `
    <li class="pag__item">1</li>
    <li class="pag__item">${secondItemLogic}</li>
    <li class="pag__item">${thirdItemLogic}</li>
    <li class="pag__item">${fourthItemLogic}</li>
    <li class="pag__item">${fifthItemLogic}</li> 
    <li class="pag__item">${sixthItemLogic}</li>
    <li class="pag__item">${seventhItemLogic}</li>
    <li class="pag__item">${eightItemLogic}</li>
    <li class="pag__item">${totalPaginationPages}</li>
    `,
    );
  }
  onSetPaginationItemClass();
}

function onSetPaginationItemClass() {
  const pagPage = sessionStorage.getItem('page');
  refs.pagList.firstElementChild.classList.add('is-active');
  refs.pagList.childNodes.forEach(el => {
    if (el.textContent === pagPage) {
      refs.pagList.firstElementChild.classList.remove('is-active');
      el.classList.add('is-active');
    }

    if (el.textContent === '...') {
      el.classList.add('disabled');
    }

    if (el.textContent.length === 2) {
      el.classList.add('modified');
    }
  });
  sessionStorage.setItem('page', '1');
}

function onClick(e) {
  window.scrollTo(0, 0);
  const APITag = ApiService.tag;
  const page = +e.target.textContent;
  sessionStorage.setItem('page', page);

  if (e.target.nodeName === 'UL') {
    return;
  }

  if (isNaN(page)) {
    return;
  }
  if (APITag === 'default') {
    renderDefaultEvents(page);
  }
  if (APITag === 'byQuery') {
    byQuery(page);
  }
  if (APITag === 'byAllCountries' || APITag === 'byOneCountry') {
    byCountry(page);
  }
  if (APITag === 'byCategory') {
    bySegment(page);
  }
}

function clearPagList() {
  if (refs.pagList.innerHTML !== '') {
    refs.pagList.innerHTML = '';
  }
}

export { paginationRender, clearPagList };
