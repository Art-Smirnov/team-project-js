export default function getRefs() {
  return {
    bodyRef: document.querySelector('body'),
    headerOverlay: document.querySelector('.header-overlay'),
    cardList: document.querySelector('.card-list'),
    searchEventInp: document.querySelector('#search-event'),
    searchEventBtn: document.querySelector('.search-event-submit'),
    selectForm: document.querySelector('.form-select'),
    modal: document.querySelector('.modal'),
    backdrop: document.querySelector('.backdrop'),
    moreButton: document.querySelector('.modal-button-more'),
    form: document.querySelector('.form-search'),
    chekBoxRef: document.querySelector('#theme-switch-toggle'),
    titleEvent: document.querySelector('.title-event'),
    scroll: document.querySelector('.back_to_top'),
  };
}
