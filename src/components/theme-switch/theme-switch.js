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
// console.log(refs.chekBoxRef);
refs.chekBoxRef.checked = localStorage.getItem('body-theme') === Theme.LIGHT;

const toggle = document.querySelector('#toggle');

// const updateBackground = event => {
//   document.body.classList.toggle('on');
// };

toggle.addEventListener(
  'click',
  () => document.body.classList.toggle('on'),
  false,
);

refs.bodyRef.classList.add(currentThemeClass);
refs.searchEventInp.classList.add(currentThemeClass);
refs.selectForm.classList.add(currentThemeClass);
refs.dreamTeamEl.classList.add(currentThemeClass);
refs.headerOverlay.classList.add(currentThemeClass);
refs.svgScroll.classList.add(currentThemeClass);

function onThemeChange({ target }) {
  target.checked
    ? changeTheme(Theme.LIGHT, Theme.DARK)
    : changeTheme(Theme.DARK, Theme.LIGHT);
}

function changeTheme(add, rem) {
  refs.bodyRef.classList.replace(rem, add);
  refs.headerOverlay.classList.replace(rem, add);
  refs.svgScroll.classList.replace(rem, add);
  refs.searchEventInp.classList.replace(rem, add);
  refs.selectForm.classList.replace(rem, add);
  refs.dreamTeamEl.classList.replace(rem, add);
  localStorage.setItem('body-theme', add);
  if (add === Theme.DARK) {
    refs.logoEl.innerHTML = getLogoDarkThemeMarkup();
  }
  if (add === Theme.LIGHT) {
    refs.logoEl.innerHTML = getLogoLightThemeMarkup();
  }
}

function getLogoDarkThemeMarkup() {
  return `<picture>
  <source srcset="
      images/desktop/logo-desktop-@1x.png 1x,
      images/desktop/logo-desktop-@2x.png 2x
    " media="(min-width:1280px)">
  <source srcset="
      images/tablet/logo-tablet-@1x.png 1x,
      images/tablet/logo-tablet-@2x.png 2x
    " media="(min-width:768px)">
  <source srcset="
      images/mobile/logo-mobile-@1x.png 1x,
      images/mobile/logo-mobile-@2x.png 2x
    " media="(min-width:767px)">
  <img src="images/mobile/logo-mobile-@1x.png" alt="Описание изображени для всех версий">
</picture>`;
}

function getLogoLightThemeMarkup() {
  return `<picture>
    <source srcset="
    ./images/light-theme/desktop/logo-desktop-@1x.png 1x,
    ./images/light-theme/desktop/logo-desktop-@2x.png 2x
  " media="(min-width:1280px)">
    <source srcset="
    ./images/light-theme/tablet/logo-tablet-@1x.png 1x,
    ./images/light-theme/tablet/logo-tablet-@2x.png 2x
  " media="(min-width:768px)">
    <source srcset="
    ./images/light-theme/mobile/logo-mobile-@1x.png 1x,
    ./images/light-theme/mobile/logo-mobile-@2x.png 2x
  " media="(min-width:767px)">
    <img src="./images/light-theme/mobile/logo-mobile-@2x.png" alt="Светлая тема">
  </picture>`;
}
