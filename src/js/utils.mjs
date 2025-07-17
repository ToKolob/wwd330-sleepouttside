/**
 * Renders a list of items to the DOM using a provided template function.
 * 
 * @param {Function} templateFn - Function that returns an HTML string for each item
 * @param {HTMLElement} parentElement - The element where the list should be inserted
 * @param {Array} list - Array of data items to render
 * @param {string} position - Position to insert the HTML (default: "afterbegin")
 * @param {boolean} clear - Whether to clear the parent element before inserting (default: false)
 */
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear && Array.isArray(list) && list.length > 0) {
    parentElement.innerHTML = '';
  }

  if (!list || list.length === 0) return;

  const htmlString = list.map(templateFn).join('');
  parentElement.insertAdjacentHTML(position, htmlString);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getParam(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) callback(data);
  
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  
  renderWithTemplate(headerTemplate, document.querySelector("#main-header"));
  renderWithTemplate(footerTemplate, document.querySelector("#main-footer"));

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

}

