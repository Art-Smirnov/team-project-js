export default function renderSelectAuthors(arr, selectAuthor) {
  const option = arr.map(({ name }) => {
    return `<option value="${name}">${name}</option>`;
  });
  selectAuthor.insertAdjacentHTML('beforeend', option);

  selectAuthor.addEventListener('click', () => {
    if (selectAuthor.classList.contains('is-active')) {
      selectAuthor.classList.remove('is-active');
      return;
    }
    selectAuthor.classList.add('is-active');
  });

  selectAuthor.addEventListener('blur', () => {
    selectAuthor.classList.remove('is-active');
  });
}
