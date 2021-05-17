export default function getRefs() {
  return {
    bodyRef: document.querySelector('body'),
    mainContainer: document.querySelector('.main-container'),
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
    lightLogoEl: document.querySelector('.logo-container.light-logo'),
    darkLogoEl: document.querySelector('.logo-container.dark-logo'),
    dreamTeamEl: document.querySelector('.dream-team-section'),
    scroll: document.querySelector('.back_to_top'),
    svgScroll: document.querySelector('.svg-theme'),
    pagList: document.querySelector('.pag__list'),
  };
}
