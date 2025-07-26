import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

// Optional cart clear based on URL param
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("cleared") === "true") {
  localStorage.removeItem("so-cart");
  setLocalStorage("so-cart", []);
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartSection = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".list-footer");
  const cartBadge = document.getElementById("cart-count");
  const totalElement = document.querySelector(".list-total");

  if (cartItems.length === 0) {
    cartSection.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter?.classList.add("hide");
    cartBadge && (cartBadge.textContent = "0");
    totalElement && (totalElement.textContent = "Total: ₹0.00");
    return;
  }

  const htmlItems = cartItems.map(cartItemTemplate);
  cartSection.innerHTML = htmlItems.join("");

  // Total Calculation
  const total = cartItems.reduce((sum, item) => {
    return sum + item.FinalPrice * (item.quantity || 1);
  }, 0);
  totalElement && (totalElement.textContent = `Total: ₹${total.toFixed(2)}`);
  cartFooter?.classList.remove("hide");

  // Cart Badge Count
  if (cartBadge) {
    const badgeCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cartBadge.textContent = badgeCount.toString();
  }
}

function cartItemTemplate(item) {
  const quantity = item.quantity || 1;
  const totalPrice = (item.FinalPrice * quantity).toFixed(2);

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}">
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${quantity}</p>
    <p class="cart-card__price">₹${totalPrice}</p>
  </li>`;
}

// Initialize on page load
renderCartContents();