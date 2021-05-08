const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

const MY_KEY = '0E9J50fYPIbPJoVb72f3QU7X5EGa9oFk';

const DEFAULT_COUNTRY = 'US';

export default class ApiService {
  constructor() {
    this.page = 1;
  }

  async fetchDefaultEvents() {
    const response = await fetch(
      `${BASE_URL}events.json?countryCode=${DEFAULT_COUNTRY}&apikey=${MY_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();

    return await Promise.resolve(res._embedded.events);
  }
}
