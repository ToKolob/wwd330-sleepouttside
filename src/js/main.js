import ProductList from './ProductList.mjs';
import ProductData from './ProductData.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

// 🧩 Load header and footer dynamically
loadHeaderFooter();

// 📦 DOM elements
const productId = getParam('id');
const category = getParam('category'); // ⭐ New: allows category-based filtering
const listElement = document.querySelector('.product-list');
const productSection = document.querySelector('.products');
const detailSection = document.getElementById('product-detail');
const backBtn = document.getElementById('back-to-list');

// 🌐 Load mock data (change false to use real API)
const dataSource = new ProductData(true);

// 🧠 Instantiate the product list — pass category if available
const productList = new ProductList(category, dataSource, listElement);

// 🔙 Handle back-to-list button for detail page
if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

// 📄 Load either a single product detail or the full product list
if (productId) {
  productSection.style.display = 'none';
  detailSection.style.display = 'block';

  dataSource.findProductById(productId)
    .then(product => {
      if (!product) {
        detailSection.innerHTML = '<p>Product not found.</p>';
        return;
      }

      document.getElementById('detail-name').textContent = product.Name;
      document.getElementById('detail-image').src = product.PrimaryMedium || '/images/default.jpg';
      document.getElementById('detail-image').alt = product.Name;
      document.getElementById('detail-brand').textContent = `Brand: ${product.Brand?.Name || 'Unknown'}`;
      document.getElementById('detail-price').textContent = `Price: ₹${product.FinalPrice || product.ListPrice}`;
      document.getElementById('detail-category').textContent = `Category: ${product.Category || 'N/A'}`;
    })
    .catch(err => {
      console.error('Error loading product detail:', err);
    });
} else {
  productSection.style.display = 'block';
  detailSection.style.display = 'none';
  productList.init(); // ✅ Loads product list and search features
}

// 🌙 Dark mode toggle after header loads
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
  }
});