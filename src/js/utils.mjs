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
  if (clear) {
    parentElement.innerHTML = '';
  }

  const htmlString = list.map(templateFn).join('');
  parentElement.insertAdjacentHTML(position, htmlString);
}
