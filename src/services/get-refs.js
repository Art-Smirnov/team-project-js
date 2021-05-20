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
    chekBoxRef: document.querySelector('#toggle'),
    chekBoxContainer: document.querySelector('.toggle'),
    logoEl: document.querySelectorAll('.logo-container'),
    lightLogoEl: document.querySelector('.logo-container.light-logo'),
    darkLogoEl: document.querySelector('.logo-container.dark-logo'),
    genreEl: document.querySelector('.genre-section'),
    scroll: document.querySelector('.back_to_top'),
    svgScroll: document.querySelector('.svg-theme'),
    pagList: document.querySelector('.pag__list'),
    btnProfile: document.querySelector('.btn-sign'),
    btnLikeEvent: document.querySelector('.like-event'),
    btnDeleteEvent: document.querySelector('.delete-event'),
    backdropAuth: document.querySelector('.backdrop-auth'),
    eventCurrentUsers: document.querySelector('.btn-list-event-user'),
    bgDecorContainer: document.querySelector('.bg-decor-elements'),
    titleContainer: document.querySelector('.header-title-container'),
    title: document.querySelector('.header-title'),
    cardTitle: document.querySelector('.card-list-item__title'),
    genre: document.querySelector('.genre'),
    listCategory: document.querySelector('.category-list'),
    greetingUser: document.querySelector('.form-title'),
    developersLink: document.querySelector('.dev-link'),
    devSection: document.querySelector('.dev-card.container'),
    btnCloseModalUser: document.querySelector('.modal-sign-in-close-btn'),
    boxHideInputsModal: document.querySelector('.modal-signin-inputs-js'),
    decors: document.querySelectorAll('.kaput'),
  };
}
