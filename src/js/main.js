import ProductList from './ProductList.mjs';
import ExternalServices from './ExternalServices.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

// Inject header and footer
loadHeaderFooter();

// Get parameters
const productId = getParam('id');
const category = getParam('category');

// Data service (mock mode enabled)
const dataSource = new ExternalServices(true);

document.addEventListener('DOMContentLoaded', () => {
  // DOM references
  const listElement = document.querySelector('.product-list');
  const productSection = document.querySelector('.products');
  const detailSection = document.getElementById('product-detail');
  const backBtn = document.getElementById('back-to-list');
  const toggleBtn = document.getElementById('theme-toggle');

  // Setup product list
  const productList = new ProductList(category, dataSource, listElement);

  // Navigate back to listing
  backBtn?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // 🖼 Show either product detail or list
  if (productId && detailSection) {
    productSection?.style.setProperty('display', 'none');
    detailSection.style.setProperty('display', 'block');

    dataSource.findProductById(productId)
      .then(product => {
        if (!product) {
          detailSection.innerHTML = '<p>Product not found.</p>';
          return;
        }

        const nameEl = document.getElementById('detail-name');
        const imageEl = document.getElementById('detail-image');
        const brandEl = document.getElementById('detail-brand');
        const priceEl = document.getElementById('detail-price');
        const categoryEl = document.getElementById('detail-category');

        if (nameEl) nameEl.textContent = product.Name;
        if (imageEl) {
          imageEl.src = product.PrimaryMedium || '/images/default.jpg';
          imageEl.alt = product.Name;
        }
        if (brandEl) brandEl.textContent = `Brand: ${product.Brand?.Name || 'Unknown'}`;
        if (priceEl) priceEl.textContent = `Price: ₹${product.FinalPrice || product.ListPrice}`;
        if (categoryEl) categoryEl.textContent = `Category: ${product.Category || 'N/A'}`;
      })
      .catch(err => {
        console.error('Error loading product detail:', err);
        detailSection.innerHTML = '<p>Error loading product details.</p>';
      });
  } else {
    productSection?.style.setProperty('display', 'block');
    detailSection?.style.setProperty('display', 'none');
    listElement && productList.init();
  }

  // Theme toggle
  toggleBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });
});

// document.querySelector("#place-order-btn").addEventListener("click", () => {
//   checkout.checkout();
// });