import ProductData from "./ProductData.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

// Load site header and footer
loadHeaderFooter();

// 🔍 Get product ID from URL
const productId = getParam("id");

// 📦 Create a ProductData instance
const dataSource = new ProductData();

// 🧩 Render product details
async function renderProductDetails() {
  try {
    const product = await dataSource.findProductById(productId);

    if (!product) {
      document.querySelector(".product-detail").innerHTML =
        "<p>Product not found.</p>";
      return;
    }

    const imageURL = product.PrimaryLarge || "/images/default.jpg";
    const brandName = product.Brand?.Name || "Unknown";
    const description = product.Description || "No description available.";
    const price = product.FinalPrice ? `₹${product.FinalPrice}` : "Price not available";

    document.querySelector(".product-detail").innerHTML = `
      <h2>${product.Name}</h2>
      <img src="${imageURL}" alt="${product.Name}" />
      <p><strong>Brand:</strong> ${brandName}</p>
      <p><strong>Price:</strong> ${price}</p>
      <p>${description}</p>
    `;
  } catch (error) {
    console.error("Error fetching product details:", error);
    document.querySelector(".product-detail").innerHTML =
      "<p>Error loading product.</p>";
  }
}

renderProductDetails();