import getRefs from '../../services/get-refs.js';
import clearGallery from '../events-list/events-list.js';
import devCardTmpl from '../../templates/developer-card-markup.hbs';
import developers from './developers.js';

const refs = getRefs();

refs.developersLink.addEventListener('click', renderDevelopersList);

function renderDevelopersList() {
    clearGallery();

    refs.devSection.insertAdjacentHTML('afterbegin', devCardTmpl(developers));
};

console.log(devCardTmpl(developers));