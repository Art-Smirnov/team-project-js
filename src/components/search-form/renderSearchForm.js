import countryCodes from '../../services/countriesCodes';
import refs from '../../services/get-refs.js';

renderSelectCountry(countryCodes);

function renderSelectCountry(arr) {
  const option = arr.map(({ alphaCode, name }) => {
    return `<option value="${alphaCode}">${name}</option>`;
  });
  refs().selectForm.insertAdjacentHTML('beforeend', option);
}

refs().selectForm.addEventListener('change', onSelectCountry);

function onSelectCountry(e) {
  let selectEl = e.target;
  let value = selectEl.options[selectEl.selectedIndex].value;
  let text = selectEl.options[selectEl.selectedIndex].text;
  console.log(value, '---value');
  console.log(text, '---text');
  return text;
}
