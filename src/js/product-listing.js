// src/js/product-listing.js
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

(async function initProductListing() {
  try {
    // Load reusable header and footer
    loadHeaderFooter();

    // Get category from URL; default to 'all'
    const category = getParam('category')?.toLowerCase() || 'all';

    // Optional: Map for display-friendly category names
    const categoryMap = {
      tents: 'Tents',
      sleepingbags: 'Sleeping Bags',
      backpacks: 'Backpacks',
      hammocks: 'Hammocks',
      all: 'All'
    };

    // Format category name for display
    const displayCategory = categoryMap[category] || capitalize(category);

    // Update heading span
    const headingSpan = document.querySelector('.title.highlight');
    if (headingSpan) {
      headingSpan.textContent = displayCategory;
    }

    // Update page <title> tag
    document.title = `Sleep Outside | Top Products: ${displayCategory}`;

    // Locate the target product list element
    const listElement = document.querySelector('.product-list');
    if (!listElement) {
      console.warn('Product list container not found.');
      return;
    }

    // Create data source and render product list
    const dataSource = new ProductData();
    const productList = new ProductList(category, dataSource, listElement);
    await productList.init();

  } catch (error) {
    console.error('Error loading product listing:', error);
    const targetElement = document.querySelector('.product-list');
if (targetElement) {
  targetElement.innerHTML = "<p>Unable to load products. Please try again later.</p>";
}

  }
})();

// Helper: Capitalize first letter
function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : 'All';
}