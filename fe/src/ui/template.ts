// export const createCheckbox = (id: string, text: string, cls: string, checked = false): string => (`
//   <label for="${id}" class="${cls}">
//     <input id="${id}" type="checkbox" ${checked ? 'checked' : ''}>
//     ${text}
//   </label>
// `);

const createCheckbox = (id: string, text: string, cls: string, checked = false): HTMLLabelElement => {
  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.classList.add(cls);

  const input = document.createElement('input');
  input.checked = checked;
  input.type = 'checkbox';
  input.setAttribute('id', id);

  label.append(input);
  label.append(text);
  return label;
}
 
export const getTemplate = (): HTMLDivElement => {
  const container = document.createElement('div');
  container.classList.add('filter');

  container.append(createCheckbox('chbx-weight', 'Show weight', 'filter__checkbox'));

  return container;
}
