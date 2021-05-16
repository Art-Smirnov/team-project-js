import {
  renderDefaultEvents,
  byCountry,
  byQuery,
} from '../events-list/events-list';
import ApiService from '../../services/apiService';
import getRefs from '../../services/get-refs.js';
const refs = getRefs();
refs.pagList.addEventListener('click', onClick);

function paginationRender({ totalPages }, currentPage) {
  const secondItemLogic = currentPage - 2 > 2 ? '...' : '2';
  const thirdItemLogic =
    currentPage < 5
      ? '3'
      : totalPages - 3 < currentPage
      ? totalPages - 4
      : currentPage - 1;
  const fourthItemLogic =
    currentPage < 5
      ? '4'
      : totalPages - 2 <= currentPage
      ? totalPages - 3
      : currentPage;
  const fifthItemLogic =
    currentPage < 5
      ? '5'
      : totalPages - 3 < currentPage
      ? totalPages - 2
      : currentPage + 1;
  const sixthItemLogic = currentPage + 3 < totalPages ? '...' : totalPages - 1;

  if (totalPages <= 7) {
    const arr = [];

    for (let i = 1; i <= totalPages; i += 1) {
      arr.push(`<li>${i}</li>`);
    }
    const fullArr = arr.join('');
    refs.pagList.insertAdjacentHTML('beforeend', fullArr);
  }
  if (totalPages > 7) {
    refs.pagList.insertAdjacentHTML(
      'beforeend',
      `
    <li>1</li>
    <li>${secondItemLogic}</li>
    <li>${thirdItemLogic}</li>
    <li>${fourthItemLogic}</li>
    <li>${fifthItemLogic}</li>
    <li>${sixthItemLogic}</li>
    <li>${totalPages}</li>
    `,
    );
  }
}

function onClick(e) {
  const APITag = ApiService.tag;
  const page = Number(e.target.textContent);

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
}

function clearPagList() {
  if (refs.pagList.innerHTML !== '') {
    refs.pagList.innerHTML = '';
  }
}

export { paginationRender, clearPagList };
