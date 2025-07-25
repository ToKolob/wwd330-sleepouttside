// Query Selector Utility
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Add Click & Touch Event Support
export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) return;

  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

// Local Storage Helpers
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Get URL Parameter
export function getParam(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

// Render a List Using Template
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) parentElement.innerHTML = "";
  if (!list || list.length === 0) return;

  const htmlString = list.map(templateFn).join("");
  parentElement.insertAdjacentHTML(position, htmlString);
}

// Render Static Template with Callback
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) callback(data);
}

// Load HTML Templates
export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Template not found: ${path}`);
  return await res.text();
}

// Load Header and Footer Partials
export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate("../partials/header.html");
    const footerTemplate = await loadTemplate("../partials/footer.html");

    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
  } catch (err) {
    console.error("Error loading header/footer templates:", err);
  }
}

// Highlight Search Match Text (Missing Export from Earlier)
export function highlight(text, query) {
  if (!query || !text) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, `<span class="highlight">$1</span>`);
}
