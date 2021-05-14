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
    form: document.querySelector('.form-search'),
    chekBoxRef: document.querySelector('#theme-switch-toggle'),
    logoEl: document.querySelector('.logo-container'),
    dreamTeamEl: document.querySelector('.dream-team-section'),
    scroll: document.querySelector('.back_to_top'),
    svgScroll: document.querySelector('.svg-theme'),
    pagList: document.querySelector('.pag__list'),
  };
}
