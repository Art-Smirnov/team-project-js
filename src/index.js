import './shared_scss/main.scss';

import './services/apiService.js';
import './services/countriesCodes.js';
import preloaderFactory from './services/placeholder/placeholder.js';
import ApiService from './services/apiService.js';

const preloader = preloaderFactory('.lds-roller');
const apiService = new ApiService();
// preloader.show();

apiService.fetchDefaultEvents();
