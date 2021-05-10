const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

const MY_KEY = '0E9J50fYPIbPJoVb72f3QU7X5EGa9oFk';

const DEFAULT_COUNTRY = 'US';

export default class ApiService {
  // constructor() {
  //   this.page = 1;
  //   this.searchQuery = '';
  //   this.countryQuery = '';
  // }

  static async fetchDefaultEvents() {
    const response = await fetch(
      `${BASE_URL}events.json?countryCode=${DEFAULT_COUNTRY}&apikey=${MY_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();

    return await Promise.resolve(res._embedded.events);
  }

  static async fetchEventsByQuery(value) {
    console.log(value);
    const response = await fetch(
      `${BASE_URL}events.json?keyword=${value}&apikey=${MY_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();

    return await Promise.resolve(res._embedded.events);
  }

  async fetchEventsByCountry() {
    const response = await fetch(
      `${BASE_URL}events.json?countryCode=${this.countryQuery}&apikey=${MY_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();

    return await Promise.resolve(res._embedded.events);
  }

  setSelectedCountry(selectCountryCode) {
    this.countryQuery = selectCountryCode;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
