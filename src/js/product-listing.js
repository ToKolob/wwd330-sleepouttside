import ProductData from './ProductData.mjs';
import { loadHeaderFooter, getParam, getLocalStorage, setLocalStorage } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const heading = document.querySelector('.product-title');
if (heading) {
  heading.textContent = `Top Products: ${category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All'}`;
}

const listElement = document.querySelector('.product-list');
const dataSource = new ProductData(true); // set to false for live data

function applyDynamicDiscount(product) {
  if (product.price > 5000) {
    product.originalPrice = product.price;
    product.price = Math.round(product.price * 0.9);
    product.discounted = true;
  }
  return product;
}

function renderProducts(products) {
  listElement.innerHTML = '';

  products.forEach(original => {
    const product = applyDynamicDiscount({ ...original });

    const item = document.createElement('li');
    item.classList.add('product-card');

    item.innerHTML = `
      <div class="card">
        <a href="/product_pages/product-detail.html?id=${product.Id}">
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.Brand}</h3>
          <h2>${product.name}</h2>
        </a>
        ${
          product.discounted
            ? `<p><del>₹${product.originalPrice}</del> <strong>₹${product.price}</strong></p>
               <p class="discount-note">🎉 10% off on premium items!</p>`
            : `<p>Price: ₹${product.price}</p>`
        }
        <button class="add-btn" data-id="${product.Id}">Add to Cart</button>
      </div>
    `;

    item.querySelector('.add-btn').addEventListener('click', () => addToCart(product));
    listElement.appendChild(item);
  });
}

function addToCart(product) {
  const cart = getLocalStorage('so-cart') || [];
  cart.push(product);
  setLocalStorage('so-cart', cart);
  alert(`${product.name} added to cart!`);
}

dataSource.getData(category).then(products => renderProducts(products));