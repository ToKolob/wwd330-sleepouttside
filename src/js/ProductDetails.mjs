import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  // Set category based on the product type or use a default
  const category = "Tents"; // Default category, could be determined from product data
  document.querySelector("h2").textContent = category;
  
  document.querySelector("#p-brand").textContent = product.Brand?.Name || "Unknown Brand";
  document.querySelector("#p-name").textContent = product.NameWithoutBrand || product.Name;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Image || product.Images?.PrimaryExtraLarge || "/images/default.jpg";
  productImage.alt = product.NameWithoutBrand || product.Name;
  
  const euroPrice = new Intl.NumberFormat('de-DE',
    {
      style: 'currency', currency: 'EUR',
    }).format(Number(product.FinalPrice || product.ListPrice) * 0.85);
  document.querySelector("#p-price").textContent = `${euroPrice}`;
  
  // Handle colors safely
  const colorText = product.Colors && product.Colors.length > 0 
    ? product.Colors[0].ColorName 
    : "Color not specified";
  document.querySelector("#p-color").textContent = colorText;
  
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple || "No description available";

  document.querySelector("#add-to-cart").dataset.id = product.Id;
}
