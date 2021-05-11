import getRefs from '../../services/get-refs';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const refs = getRefs();

refs.chekBoxRef.addEventListener('change', onThemeChange);

refs.bodyRef.classList.add(Theme.DARK);
refs.headerOverlay.classList.add(Theme.DARK);
populateBodyClassList();

function onThemeChange() {
  refs.bodyRef.classList.toggle(Theme.LIGHT);
  refs.bodyRef.classList.toggle(Theme.DARK);
  refs.headerOverlay.classList.toggle(Theme.LIGHT);
  refs.headerOverlay.classList.toggle(Theme.DARK);

  save('theme', refs.bodyRef.classList[0]);
  save('headerOverlay-theme', refs.headerOverlay.classList[0]);
}

function populateBodyClassList() {
  const savedMassage = load('theme');
  const heroSavedMassage = load('headerOverlay-theme');

  if (savedMassage && heroSavedMassage) {
    refs.bodyRef.classList.add(savedMassage);
    refs.headerOverlay.classList.add(heroSavedMassage);
  }

  if (savedMassage === Theme.LIGHT && heroSavedMassage === Theme.LIGHT) {
    refs.bodyRef.classList.remove(Theme.DARK);
    refs.headerOverlay.classList.remove(Theme.DARK);
    refs.chekBoxRef.checked = true;
  }
}

function load(key) {
  return localStorage.getItem(key);
}

function save(key, value) {
  localStorage.setItem(key, value);
}
