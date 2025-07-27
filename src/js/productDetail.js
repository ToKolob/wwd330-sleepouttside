import ExternalServices from "./ExternalServices.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import { renderProductDetailsUI } from "./productDetailsTemplate.mjs";

// Load global header and footer components
loadHeaderFooter();

// 🔍 Extract product ID from query string
const productId = getParam("id");

// 📦 Instantiate data source using refactored service
const dataSource = new ExternalServices();

// 🧩 Render product details dynamically
async function renderProductDetails() {
  try {
    const product = await dataSource.findProductById(productId);

    if (!product) {
      document.querySelector(".product-detail").innerHTML = "<p>Product not found.</p>";
      return;
    }

    // Use modular UI renderer
    renderProductDetailsUI(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    document.querySelector(".product-detail").innerHTML = "<p>Error loading product.</p>";
  }
}

renderProductDetails();