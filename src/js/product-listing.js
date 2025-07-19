import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

// Load header and footer into the page
loadHeaderFooter();

// Get category from URL, if present
const category = getParam('category');

// Optional: Capitalize for display
function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : 'All';
}

// Update page heading
const heading = document.querySelector('.product-title');
if (heading) {
  heading.textContent = `Top Products: ${capitalize(category)}`;
}

// Use mock data during development (set to true to enable)
const dataSource = new ProductData(true); // 👈 true = use mockProducts

// Select list container
const listElement = document.querySelector('.product-list');

// Initialize product list and render + attach search
const myList = new ProductList(category, dataSource, listElement);
myList.init();