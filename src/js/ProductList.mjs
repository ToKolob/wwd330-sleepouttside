// ProductList.mjs
import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  const discountedPrice = product.Discount
    ? (product.FinalPrice * (1 - product.Discount)).toFixed(2)
    : product.FinalPrice.toFixed(2);

  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images?.PrimaryMedium || '/images/default.jpg'}" alt="Image of ${product.Name}" />
        <h3 class="card__brand">${product.Brand?.Name || 'Unknown Brand'}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">₹${discountedPrice}</p>
        <label>
          Quantity:
          <input type="number" min="1" value="1" data-id="${product.Id}" class="quantity-selector" />
        </label>
        <button class="add-to-cart" data-id="${product.Id}">Add to Cart</button>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement =
      typeof listElement === 'string'
        ? document.querySelector(listElement)
        : listElement;
  }

  async init() {
    try {
      const list = await this.dataSource.getData(this.category);

      if (!list || list.length === 0) {
        this.listElement.innerHTML = `<p>No products found for category: ${this.category}</p>`;
        return;
      }

      this.renderList(list);
      const titleEl = document.querySelector('.title');
      if (titleEl) titleEl.textContent = this.category;
    } catch (error) {
      console.error('Error initializing product list:', error);
      this.listElement.innerHTML = `<p>Error loading products. Please try again later.</p>`;
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}