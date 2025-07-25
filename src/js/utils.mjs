// Element selector shortcut
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Add click and touch support
export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) return;

  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

// Get value from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Save value to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Get a parameter from the URL
export function getParam(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

// Render multiple items using a template
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) parentElement.innerHTML = "";
  if (!list || list.length === 0) return;

  const htmlString = list.map(templateFn).join("");
  parentElement.insertAdjacentHTML(position, htmlString);
}

// Render a single item/template with optional callback
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) callback(data);
}

// Load an external HTML template
export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Template not found: ${path}`);
  return await res.text();
}

// Load header and footer templates
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