import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

// Load the common site header and footer
loadHeaderFooter();

// Get the category from the URL parameter (e.g., ?category=tents)
const category = getParam('category');

// Capitalize the category name (optional for styling)
function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : 'All';
}

// Update the page title dynamically
const heading = document.querySelector('.product-title');
if (heading) {
  heading.textContent = `Top Products: ${capitalize(category)}`;
}

// Create a ProductData instance to fetch products
const dataSource = new ProductData();

// Select the element to render the product list into
const listElement = document.querySelector('.product-list');

// Create and initialize the ProductList
const myList = new ProductList(category, dataSource, listElement);

// Show the filtered product list
myList.init();