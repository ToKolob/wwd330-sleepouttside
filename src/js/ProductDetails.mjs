import { productDetailsTemplate } from './productDetailsTemplate.mjs';
import { setLocalStorage, getLocalStorage } from './utils.mjs';

// 🛍️ Modular class to handle individual product detail rendering and cart logic
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    console.log(`Initializing ProductDetails for product ID: ${this.productId}`);
    
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this)); // 🔧 Fixed method name
  }

  addProductToCart() {
    const cartContents = getLocalStorage('so-cart') || [];
    cartContents.push(this.product);
    setLocalStorage('so-cart', cartContents);
  }

  renderProductDetails() {
    console.log("Rendering product details...");
    
    renderProductDetailsUI(this.product);
  }
}

// 🎨 UI rendering function
function renderProductDetailsUI(product) {
  document.querySelector("h2").textContent = product.Brand?.Name || "Brand not available";
  document.querySelector("h3").textContent = product.NameWithoutBrand || product.Name;

  const productImage = document.getElementById("productImage");
  productImage.src = product.PrimaryLarge || "/images/default.jpg"; // ✅ Updated image field
  productImage.alt = product.NameWithoutBrand || "Product image";

  document.getElementById("productPrice").textContent = `₹${product.FinalPrice}`;
  document.getElementById("productColor").textContent = product.Colors?.[0]?.ColorName || "N/A";
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple || "No description available.";

  document.getElementById("addToCart").dataset.id = product.Id;
}