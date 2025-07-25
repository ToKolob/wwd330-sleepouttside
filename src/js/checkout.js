import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// 🛒 Load cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("so-cart")) || [];
}

// 📦 Count total items
function countItems(cart) {
  return cart.reduce((total, item) => total + (item.Quantity || 1), 0);
}

// 💰 Calculate subtotal
function calculateSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.FinalPrice * (item.Quantity || 1), 0);
}

// 🚚 Estimate shipping cost
function calculateShipping(subtotal) {
  return subtotal > 3000 ? 0 : 300;
}

// 🧾 Estimate tax (e.g., 12%)
function calculateTax(subtotal) {
  return Math.round(subtotal * 0.12);
}

// 🔢 Update the Order Summary section
function renderSummary(cart) {
  const numberItems = countItems(cart);
  const subtotal = calculateSubtotal(cart);
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = subtotal + shipping + tax;

  // Inject values into DOM
  document.getElementById("numberItems").textContent = numberItems;
  document.getElementById("cartTotal").textContent = `₹${subtotal}`;
  document.getElementById("shipping").textContent = `₹${shipping}`;
  document.getElementById("tax").textContent = `₹${tax}`;
  document.getElementById("total").textContent = `₹${total}`;
}

// 🚀 Initialize checkout page
function initCheckout() {
  const cart = getCart();
  renderSummary(cart);
}

initCheckout();