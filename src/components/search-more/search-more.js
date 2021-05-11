import refs from '../../services/get-refs';
import ApiService from '../../services/apiService.js';

const apiService = new ApiService();
// console.log(refs().moreButton);
refs().moreButton.addEventListener('click', onSearchMore);

async function onSearchMore() {
   const result = await apiService.fetchDefaultEvents();
    // console.log(result);
}
