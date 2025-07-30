/**
 * Renders a list of items using a template function
 * @param {HTMLElement} listElement
 * @param {Array} list
 * @param {Function} template
 */
export function renderListWithTemplate(listElement, list, template) {
  listElement.innerHTML = '';
  list.forEach(item => {
    const html = template(item);
    listElement.insertAdjacentHTML('beforeend', html);
  });
}

/**
 * Retrieves data from localStorage
 * @param {string} key
 * @returns {Array|Object|null}
 */
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Error parsing localStorage data:', err);
    return null;
  }
}

/**
 * Saves data to localStorage
 * @param {string} key
 * @param {Array|Object} data
 */
export function setLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Error setting localStorage data:', err);
  }
}

/**
 * Removes a specific item from localStorage array by ID
 * @param {string} key
 * @param {string} productId
 */
export function removeItemFromStorage(key, productId) {
  const currentData = getLocalStorage(key);
  if (Array.isArray(currentData)) {
    const updatedData = currentData.filter(item => item.id !== productId);
    setLocalStorage(key, updatedData);
  }
}

/**
 * Loads reusable header and footer templates
 */
export function loadHeaderFooter() {
  fetch('/partials/header.html')
    .then(res => {
      if (!res.ok) throw new Error('Header fetch failed');
      return res.text();
    })
    .then(header => {
      document.querySelector('header').innerHTML = header;
    })
    .catch(err => {
      console.warn('Header could not be loaded:', err);
    });

  fetch('/partials/footer.html')
    .then(res => {
      if (!res.ok) throw new Error('Footer fetch failed');
      return res.text();
    })
    .then(footer => {
      document.querySelector('footer').innerHTML = footer;
    })
    .catch(err => {
      console.warn('Footer could not be loaded:', err);
    });
}

/**
 * Get URL query parameters
 * @param {string} param
 * @returns {string|null}
 */
export function getParam(param) {
  const url = new URL(window.location.href);
  return url.searchParams.get(param);
}

/**
 * Creates and displays a dismissible alert message on the page
 * @param {string} message - The alert message to display
 * @param {boolean} [scroll=true] - Scrolls to top to ensure visibility
 */
export function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');

  alert.innerHTML = `
    <p>${message}</p>
    <button class="close-alert" aria-label="Dismiss message">✖</button>
  `;

  const main = document.querySelector('main');
  if (!main) return;

  main.prepend(alert);

  if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });

  alert.addEventListener('click', function (e) {
    if (e.target.classList.contains('close-alert')) {
      main.removeChild(alert);
    }
  });
}