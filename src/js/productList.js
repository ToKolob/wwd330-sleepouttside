import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load header and footer into the page
loadHeaderFooter();

// Get selected category from URL parameter (e.g., ?category=tents)
const category = getParam("category");

// Reference the UL element where products should be rendered
const productListElement = document.querySelector(".product-list");

// Optional product-specific discounts
const discounts = {
  tent: 0.15,
  backpack: 0.1,
  hammock: 0.2,
  "sleeping bag": 0.25
};

// Create instances of your data and rendering class
const dataSource = new ProductData();
const productList = new ProductList(category, dataSource, productListElement, discounts);

// Fetch and display products
productList.init();

// Update heading dynamically based on category
const heading = document.querySelector("h2");
heading.textContent = `Products: ${category || "All"}`;