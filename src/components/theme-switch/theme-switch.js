import getRefs from '../../services/get-refs';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const refs = getRefs();
const currentThemeClass =
  localStorage.getItem('body-theme') === null
    ? Theme.DARK
    : localStorage.getItem('body-theme');

refs.chekBoxRef.addEventListener('change', onThemeChange);
refs.chekBoxRef.checked = localStorage.getItem('body-theme') === Theme.LIGHT;

const cardTitle = document.querySelector('.card-list-item__title');
console.log(cardTitle);

refs.chekBoxContainer.classList.add(currentThemeClass);
refs.bodyRef.classList.add(currentThemeClass);
refs.searchEventInp.classList.add(currentThemeClass);
refs.selectForm.classList.add(currentThemeClass);
refs.dreamTeamEl.classList.add(currentThemeClass);
refs.headerOverlay.classList.add(currentThemeClass);
refs.svgScroll.classList.add(currentThemeClass);
refs.lightLogoEl.classList.add(currentThemeClass);
refs.darkLogoEl.classList.add(currentThemeClass);
refs.bgDecorContainer.classList.add(currentThemeClass);
refs.titleContainer.classList.add(currentThemeClass);
refs.title.classList.add(currentThemeClass);
cardTitle.classList.add(currentThemeClass);

function onThemeChange({ target }) {
  target.checked
    ? changeTheme(Theme.LIGHT, Theme.DARK)
    : changeTheme(Theme.DARK, Theme.LIGHT);
}

function changeTheme(add, rem) {
  refs.chekBoxContainer.classList.replace(rem, add);
  refs.bodyRef.classList.replace(rem, add);
  refs.headerOverlay.classList.replace(rem, add);
  refs.svgScroll.classList.replace(rem, add);
  refs.searchEventInp.classList.replace(rem, add);
  refs.selectForm.classList.replace(rem, add);
  refs.dreamTeamEl.classList.replace(rem, add);
  refs.lightLogoEl.classList.replace(rem, add);
  refs.darkLogoEl.classList.replace(rem, add);
  refs.bgDecorContainer.classList.replace(rem, add);
  refs.titleContainer.classList.replace(rem, add);
  refs.title.classList.replace(rem, add);
  cardTitle.classList.replace(rem, add);
  localStorage.setItem('body-theme', add);
}
