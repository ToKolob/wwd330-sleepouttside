import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

(async function initProductListing() {
  try {
   
    loadHeaderFooter();

    const category = getParam('category')?.toLowerCase() || 'all';

    const categoryMap = {
      tents: 'Tents',
      sleepingbags: 'Sleeping Bags',
      backpacks: 'Backpacks',
      hammocks: 'Hammocks',
      all: 'All'
    };
    
    const displayCategory = categoryMap[category] || capitalize(category);
    
    const headingSpan = document.querySelector('.title.highlight');
    if (headingSpan) {
      headingSpan.textContent = displayCategory;
    }
    
    document.title = `Sleep Outside | Top Products: ${displayCategory}`;
    
    const listElement = document.querySelector('.product-list');
    if (!listElement) {
      console.warn('Product list container not found.');
      return;
    }
    
    const dataSource = new ProductData();
    const productList = new ProductList(category, dataSource, listElement);
    await productList.init();

  } catch (error) {
    console.error('Error loading product listing:', error);
    document.querySelector('.product-list')?.innerHTML =
      "<p>Unable to load products. Please try again later.</p>";
  }
})();

function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : 'All';
}

