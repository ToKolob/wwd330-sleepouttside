import { renderListWithTemplate, debounce, highlight } from "./utils.mjs";

// Template for each product card
function productCardTemplate(product) {
  const discount = product.discount || 0;
  const hasDiscount = discount > 0;

  const originalPrice = product.ListPrice || product.FinalPrice || 0;
  const discountedPrice = hasDiscount
    ? (originalPrice * (1 - discount)).toFixed(2)
    : originalPrice.toFixed(2);

  const imageSrc = product.PrimaryMedium || "/images/default.jpg";
  const brandName = product.Brand?.Name || "Unknown Brand";
  const query = product._searchQuery || "";
  const highlightedName = highlight(product.Name || "", query);
  const highlightedBrand = highlight(product.Brand?.Name || "", query);

  return `
    <li class="product-card">
      <a href="/product_pages/product-detail.html?id=${product.Id}">
        <img src="${imageSrc}" alt="${product.Name}" onerror="this.src='/images/default.jpg';" />
        <h3 class="card__brand">${highlightedBrand}</h3>
        <h2 class="card__name">${highlightedName}</h2>
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
    this.originalList = [];
  }

  async init() {
    try {
      const list = await this.dataSource.getData(this.category);
      console.log("Fetched products:", list);

      if (!list || list.length === 0) {
        this.listElement.innerHTML = "<p>No products found.</p>";
        return;
      }

      // Apply discounts
      const discountedList = list.map((product) => {
        const matchedKey = Object.keys(this.discounts).find((key) =>
          product.Name?.toLowerCase().includes(key.toLowerCase())
        );
        if (matchedKey) {
          product.discount = this.discounts[matchedKey];
        }
        return product;
      });

      this.renderList(discountedList);
    } catch (err) {
      console.error("Failed to load product data:", err);
      this.listElement.innerHTML = "<p>Error loading product list.</p>";
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}
