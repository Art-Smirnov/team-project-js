import './shared_scss/main.scss';

import './services/apiService.js';
import './services/countriesCodes.js';
import preloaderFactory from './services/placeholder/placeholder.js';
import cardTmpl from './templates/card-list-item.hbs';
import listTmpl from './templates/card-list.hbs';

const preloader = preloaderFactory('.lds-roller');

// preloader.show();
