import ProductList from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Inject reusable header and footer components
loadHeaderFooter();

// Get the category value from URL query string
const category = getParam("category");

// Grab the DOM element where products will render
const productListElement = document.querySelector(".product-list");

// Optional category-based discounts
const discounts = {
  tent: 0.15,
  backpack: 0.1,
  hammock: 0.2,
  "sleeping bag": 0.25
};

// Instantiate data source and product list renderer
const dataSource = new ExternalServices();
const productList = new ProductList(category, dataSource, productListElement, discounts);

// Initialize product list
productList.init();

// Update the page heading based on category
const heading = document.querySelector("h2");
if (heading) {
  heading.textContent = category
    ? `Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`
    : "Products: All";
}