import getRefs from '../../services/get-refs.js';

const refs = getRefs();

export default function renderSelectCountry(arr) {
  const option = arr.map(({ alphaCode, name }) => {
    return `<option value="${alphaCode}">${name}</option>`;
  });
  refs.selectForm.insertAdjacentHTML('beforeend', option);
}

refs.selectForm.addEventListener('click', () => {
  if (refs.selectForm.classList.contains('is-active')) {
    refs.selectForm.classList.remove('is-active');
    return
  }
  refs.selectForm.classList.add('is-active')
})

refs.selectForm.addEventListener('blur', () => {
  refs.selectForm.classList.remove('is-active')
})

