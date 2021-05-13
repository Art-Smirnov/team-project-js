import getRefs from '../../services/get-refs';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const refs = getRefs();

refs.chekBoxRef.addEventListener('change', onThemeChange);
refs.chekBoxRef.checked = localStorage.getItem('body-theme') === Theme.LIGHT;

refs.bodyRef.classList.add(
  localStorage.getItem('body-theme') === null
    ? Theme.DARK
    : localStorage.getItem('body-theme'),
);

refs.headerOverlay.classList.add(
  localStorage.getItem('headerOverlay-theme') === null
    ? Theme.DARK
    : localStorage.getItem('headerOverlay-theme'),
);
console.log(refs.svgScroll);

refs.svgScroll.classList.add(
  localStorage.getItem('svg-theme-dark') === null
    ? Theme.DARK
    : localStorage.getItem('svg-theme-dark'),
);

function onThemeChange({ target }) {
  target.checked
    ? changeTheme(Theme.LIGHT, Theme.DARK)
    : changeTheme(Theme.DARK, Theme.LIGHT);
}

function changeTheme(add, rem) {
  refs.bodyRef.classList.replace(rem, add);
  refs.headerOverlay.classList.replace(rem, add);
  refs.svgScroll.classList.replace(rem, add);
  localStorage.setItem('body-theme', add);
  localStorage.setItem('headerOverlay-theme', add);
}
