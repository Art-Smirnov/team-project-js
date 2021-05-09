export default function getRefs() {
  return {
    cardList: document.querySelector('.card-list'),
    searchEventInp: document.querySelector('#search-event'),
    searchEventBtn: document.querySelector('.search-event-submit'),
    selectForm: document.querySelector('.form-select')
  };
}
