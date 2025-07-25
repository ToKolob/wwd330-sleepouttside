/** Render a list using a template function */
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) parentElement.innerHTML = '';
  if (!Array.isArray(list) || list.length === 0) return;
  const htmlString = list.map(templateFn).join('');
  parentElement.insertAdjacentHTML(position, htmlString);
}

/** LocalStorage: Get and Set with fallback */
export function getLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.warn(`LocalStorage read failed for key: ${key}`, e);
    return null;
  }
}

export function setLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`LocalStorage write failed for key: ${key}`, e);
  }
}

/** Get query parameter from URL */
export function getParam(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

/** Render raw HTML template into element */
export function renderWithTemplate(template, parentElement, callback) {
  parentElement.innerHTML = template;
  if (typeof callback === "function") callback();
}

/** Load HTML partial from file (Vite-compatible) */
export async function loadTemplate(path) {
  try {
    const res = await fetch(path); // For Vite: use "/partials/xxx.html"
    if (!res.ok) throw new Error(`Template fetch failed: ${path}`);
    return await res.text();
  } catch (err) {
    console.error(`Error loading template: ${path}`, err);
    return `<p>Error loading ${path}</p>`;
  }
}

/** Load header/footer partials into page */
export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate('/partials/header.html');
    const footerTemplate = await loadTemplate('/partials/footer.html');

    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");

    if (headerElement) renderWithTemplate(headerTemplate, headerElement);
    if (footerElement) renderWithTemplate(footerTemplate, footerElement);
  } catch (err) {
    console.error("Error injecting header/footer:", err);
  }
}

/** Debounce helper */
export function debounce(fn, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

/** Keyword highlighting utility */
export function highlight(text, keyword) {
  if (!keyword || !text) return text;
  const safeKeyword = keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'); // Escape special chars
  const regex = new RegExp(`(${safeKeyword})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

export function alertMessage(message, scroll = true) {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create new alert
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.innerHTML = `
        <p>${message}</p>
        <span class="close-btn">&times;</span>
    `;

    // Add click handler for close button
    alert.addEventListener('click', function(e) {
        if (e.target.classList.contains('close-btn')) {
            main.removeChild(this);
        }
    });

    // Add to main
    const main = document.querySelector('main');
    main.prepend(alert);

    // Scroll to top if requested
    if (scroll) {
        window.scrollTo(0, 0);
    }
}