import ApiService from '../../services/apiService.js';

// console.log(API.fetchDefaultEvents());
const API = new ApiService();

const pagList = document.querySelector('.pag__list');

// pagList.addEventListener('click');
let totalPages = 5;

const pages = API.page;
console.log(pages);

render();

function counter() {
  const arr = [];

  for (let i = 1; i <= totalPages; i += 1) {
    arr.push(`<li>${i}</li>`);
  }

  return arr.join('');
}

function render() {
  const secondItemLogic = pages - 2 > 2 ? '...' : '2';
  const thirdItemLogic =
    pages < 5 ? '3' : totalPages - 3 < pages ? totalPages - 4 : pages - 1;
  const fourthItemLogic =
    pages < 5 ? '4' : totalPages - 2 <= pages ? totalPages - 3 : pages;
  const fifthItemLogic =
    pages < 5 ? '5' : totalPages - 3 < pages ? totalPages - 2 : pages + 1;
  const sixthItemLogic = pages + 3 < totalPages ? '...' : totalPages - 1;

  if (totalPages <= 7) {
    pagList.insertAdjacentHTML('beforeend', counter());
  }
  if (totalPages > 7) {
    pagList.insertAdjacentHTML(
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
