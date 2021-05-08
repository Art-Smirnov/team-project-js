import './scss/main.scss';
import './services/apiService.js';
import './services/countriesCodes.js';
import preloaderFactory from './services/placeholder.js';

const preloader = preloaderFactory('.lds-roller');

preloader.show();
