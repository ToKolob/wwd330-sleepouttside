import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load header and footer
loadHeaderFooter();

// Get category from URL
const category = getParam("category");

// Get the element to render products
const productListElement = document.querySelector(".product-list");

// Optional discount mapping
const discounts = {
  tent: 0.15,
  backpack: 0.1,
  hammock: 0.2,
  "sleeping bag": 0.25
};

// Instantiate data source and rendering logic
const dataSource = new ProductData();
const productList = new ProductList(category, dataSource, productListElement, discounts);

// Display products
productList.init();

// Update the heading dynamically
const heading = document.querySelector("h2");
if (heading) {
  heading.textContent = `Products: ${category?.charAt(0).toUpperCase() + category?.slice(1) || "All"}`;
}