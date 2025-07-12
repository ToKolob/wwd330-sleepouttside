// src/js/ProductList.mjs

import { renderListWithTemplate } from "./utils.mjs";

// 💡 Template function for each product card
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product-detail.html?id=${product.Id}">
        <img src="${product.Image || '/images/default.jpg'}" alt="${product.Name}">
        <h2>${product.Brand?.Name || 'Unknown Brand'}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">₹${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  // 🧩 Load and render product data
  async init() {
    try {
      const list = await this.dataSource.getData();

      if (!list || list.length === 0) {
        this.listElement.innerHTML = "<p>No products found.</p>";
      } else {
        this.renderList(list);
      }
    } catch (err) {
      console.error("Failed to load product data:", err);
      this.listElement.innerHTML = "<p>Error loading product list.</p>";
    }
  }

  // 🔁 Render using utility function
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}