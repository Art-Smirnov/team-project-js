const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

const MY_KEY = '0E9J50fYPIbPJoVb72f3QU7X5EGa9oFk';

const DEFAULT_COUNTRY = 'US';

export default class ApiService {
  constructor() {
    this.tag = '';
  }

  static async fetchDefaultEvents(currentPage = 0) {
    const response = await fetch(
      `${BASE_URL}events.json?countryCode=${DEFAULT_COUNTRY}&apikey=${MY_KEY}&page=${
        currentPage - 1 < 0 ? 0 : currentPage - 1
      }`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();

    this.tag = 'default';

    return res;
  }

  static async fetchEventsByQuery(value, currentPage = 0) {
    const response = await fetch(
      `${BASE_URL}events.json?keyword=${value}&apikey=${MY_KEY}&page=${
        currentPage - 1 < 0 ? 0 : currentPage - 1
      }`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();
    this.tag = 'byQuery';

    return res;
  }

  static async fetchEventsByCountry(selectCountryCode, currentPage = 0) {
    const response = await fetch(
      `${BASE_URL}events.json?countryCode=${selectCountryCode}&page=${
        currentPage - 1 < 0 ? 0 : currentPage - 1
      }&apikey=${MY_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();
    this.tag = 'byOneCountry';

    return res;
  }

  static async fetchEventsInAllContries(currentPage = 0) {
    const response = await fetch(
      `${BASE_URL}events.json?page=${
        currentPage - 1 < 0 ? 0 : currentPage - 1
      }&apikey=${MY_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();
    this.tag = 'byAllCountries';

    return res;
  }

  static async feachEventById(currentID) {
    const responce = await fetch(
      `${BASE_URL}events/${currentID}.json?apikey=${MY_KEY}`,
    );
    if (!responce.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await responce.json();
    return res;
  }

  static async feachEventBySegments(id, currentPage = 0) {
    const responce = await fetch(
      `${BASE_URL}events.json?segmentId=${id}&page=${
        currentPage - 1 < 0 ? 0 : currentPage - 1
      }&apikey=${MY_KEY}`,
    );
    if (!responce.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await responce.json();
    this.tag = 'byCategory';
    return res;
  }
}
