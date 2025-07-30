import ProductList from './ProductList.mjs';
import ExternalServices from './ExternalServices.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';
import { CheckoutProcess } from './CheckoutProcess.mjs';

loadHeaderFooter();

const productId = getParam('id');
const category = getParam('category');

// ✅ Proper instantiation for mock data
const dataSource = new ExternalServices('', true);

document.addEventListener('DOMContentLoaded', () => {
  const listElement = document.querySelector('.product-list');
  const productSection = document.querySelector('.products');
  const detailSection = document.getElementById('product-detail');
  const backBtn = document.getElementById('back-to-list');
  const toggleBtn = document.getElementById('theme-toggle');

  const productList = new ProductList(category, dataSource, '.product-list');

  const checkout = new CheckoutProcess("so-cart", "#cart-summary");
  checkout.init();

  document.querySelector('#place-order-btn')?.addEventListener("click", () => {
    checkout.checkout();
  });

  backBtn?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  if (productId && detailSection) {
    productSection?.style.setProperty('display', 'none');
    detailSection.style.setProperty('display', 'block');

    dataSource.findProductById?.(productId)
      ?.then(product => {
        if (!product) {
          detailSection.innerHTML = '<p>Product not found.</p>';
          return;
        }

        document.getElementById('detail-name').textContent = product.Name;
        const imageEl = document.getElementById('detail-image');
        if (imageEl) {
          imageEl.src = product.PrimaryMedium || '/images/default.jpg';
          imageEl.alt = product.Name;
        }

        document.getElementById('detail-brand').textContent = `Brand: ${product.Brand?.Name || 'Unknown'}`;
        document.getElementById('detail-price').textContent = `Price: ₹${product.FinalPrice || product.ListPrice}`;
        document.getElementById('detail-category').textContent = `Category: ${product.Category || 'N/A'}`;
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

  toggleBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });

});

// document.querySelector("#place-order-btn").addEventListener("click", () => {
//   checkout.checkout();
// });

});

