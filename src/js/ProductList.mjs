import { renderListWithTemplate } from "./utils.mjs";

// Template function for each product card
function productCardTemplate(product) {
  const discount = product.discount || 0;
  const hasDiscount = discount > 0;

  const originalPrice = product.ListPrice || product.FinalPrice;
  const discountedPrice = hasDiscount
    ? (originalPrice * (1 - discount)).toFixed(2)
    : originalPrice.toFixed(2);

  return `
    <li class="product-card">
      <a href="product-detail.html?id=${product.Id}">
        <img src="${product.Image || '/images/default.jpg'}" alt="${product.Name}">
        <h3 class="card__brand">${product.Brand?.Name || 'Unknown Brand'}</h3>
        <h2 class="card__name">${product.Name}</h2>
        ${hasDiscount ? `<p class="discount-flag">${discount * 100}% OFF</p>` : ""}
        <p class="product-card__price">
          ${
            hasDiscount
              ? `<del>₹${originalPrice.toFixed(2)}</del> <strong>₹${discountedPrice}</strong>`
              : `<strong>₹${discountedPrice}</strong>`
          }
        </p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement, discounts = {}) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.discounts = discounts;
  }

  async init() {
    try {
      let list = await this.dataSource.getData();
      console.log("Fetched products:", list);

      if (!list || list.length === 0) {
        this.listElement.innerHTML = "<p>No products found.</p>";
        return;
      }
      
        list = list.map(product => {
          const discountKey = Object.keys(this.discounts).find(key => product.Name.toLowerCase().includes(key.toLowerCase()));
if (discountKey) {
  product.discount = this.discounts[discountKey];
}
      return product;
        });

        this.renderList(list);
      } catch (err) {
      console.error("Failed to load product data:", err);
      this.listElement.innerHTML = "<p>Error loading product list.</p>";
    }
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}