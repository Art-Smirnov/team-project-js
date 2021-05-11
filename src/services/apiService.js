const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

const MY_KEY = '0E9J50fYPIbPJoVb72f3QU7X5EGa9oFk';

const DEFAULT_COUNTRY = 'US';

export default class ApiService {
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

  static async fetchEventsByCountry(selectCountryCode, currentPage = 0) {
    const response = await fetch(
      `${BASE_URL}events.json?countryCode=${selectCountryCode}&page=${currentPage}&apikey=${MY_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();

    return await Promise.resolve(res._embedded);
  }

  static async fetchEventsInAllContries(currentPage = 0) {
    const response = await fetch(
      `${BASE_URL}events.json?page=${currentPage}&apikey=${MY_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();

    return await Promise.resolve(res._embedded);
  }

  static async feachEventById(currentID) {
    const responce = await fetch(
      `${BASE_URL}events/${currentID}.json?apikey=${MY_KEY}`,
    );
    if (!responce.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await responce.json();
    return await Promise.resolve(res);
  }
}
