import getRefs from '../../services/get-refs';

const refs = getRefs();

function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    refs.scroll.classList.add('back_to_top-show');
  }
  if (scrolled < coords) {
    refs.scroll.classList.remove('back_to_top-show');
  }
}

function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
    during: 1000,
  });
}

window.addEventListener('scroll', trackScroll);
refs.scroll.addEventListener('click', backToTop);
