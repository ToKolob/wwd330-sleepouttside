import ProductData from "./ProductData.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// 🔎 Get product ID from URL
const productId = getParam("id");

// 📦 Create an instance of ProductData
const dataSource = new ProductData();

// 🧩 Fetch and render product details
async function renderProductDetails() {
  try {
    const product = await dataSource.findProductById(productId);

    if (!product) {
      document.querySelector(".product-detail").innerHTML = "<p>Product not found.</p>";
      return;
    }

    // 🖼️ Use PrimaryLarge image or fallback
    const imageURL = product.PrimaryLarge || "/images/default.jpg";

    // 🛠️ Inject product data into the detail section
    document.querySelector(".product-detail").innerHTML = `
      <h2>${product.Name}</h2>
      <img src="${imageURL}" alt="${product.Name}" />
      <p><strong>Brand:</strong> ${product.Brand?.Name || "Unknown"}</p>
      <p><strong>Price:</strong> ₹${product.FinalPrice}</p>
      <p>${product.Description || "No description available."}</p>
    `;
  } catch (error) {
    console.error("Error fetching product details:", error);
    document.querySelector(".product-detail").innerHTML = "<p>Error loading product.</p>";
  }
}

renderProductDetails();