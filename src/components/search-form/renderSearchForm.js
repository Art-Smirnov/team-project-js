import refs from '../../services/get-refs.js';

export default function renderSelectCountry(arr) {
  const option = arr.map(({ alphaCode, name }) => {
    return `<option value="${alphaCode}">${name}</option>`;
  });
  refs().selectForm.insertAdjacentHTML('beforeend', option);
}
