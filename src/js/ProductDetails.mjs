import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  // Category as heading
  document.querySelector("h2").textContent =
    product.Category.charAt(0).toUpperCase() + product.Category.slice(1);

  // Brand and name
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  // Image
  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge || "/images/default.jpg";
  productImage.alt = product.NameWithoutBrand;

  // Localized Euro price
  const euroPrice = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector("#p-price").textContent = euroPrice;

  // Color & description
  document.querySelector("#p-color").textContent = product.Colors?.[0]?.ColorName || "N/A";
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  // Button setup
  const addButton = document.querySelector("#add-to-cart");
  addButton.dataset.id = product.Id;
}