import { loadHeaderFooter, getLocalStorage, setLocalStorage } from "../js/utils.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", renderCartContents);

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const listElement = document.querySelector(".product-list");

  if (!listElement) {
    console.warn("Product list element not found.");
    return;
  }

  if (!cartItems || cartItems.length === 0) {
    listElement.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  listElement.innerHTML = cartItems.map((item, index) => cartItemTemplate(item, index)).join("");

  // Bind quantity inputs after rendering
  document.querySelectorAll(".cart-card__quantity-input").forEach((input) => {
    input.addEventListener("change", updateQuantity);
  });
}

function cartItemTemplate(item, index) {
  const imageSrc = item.Image || "images/default.png";
  const quantity = item.quantity || 1;
  const total = item.FinalPrice * quantity;

  return `
    <li class="cart-card divider" data-index="${index}">
      <a href="#" class="cart-card__image">
        <img src="${imageSrc}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0]?.ColorName || "N/A"}</p>
      <label for="quantity-${index}">Quantity:</label>
      <input
        type="number"
        id="quantity-${index}"
        class="cart-card__quantity-input"
        min="1"
        value="${quantity}"
      />
      <p class="cart-card__price">
        Total: $<span class="item-total">${total.toFixed(2)}</span>
      </p>
    </li>
  `;
}

function updateQuantity(event) {
  const input = event.target;
  const newQty = parseInt(input.value);
  const cardElement = input.closest("li.cart-card");
  const index = cardElement.dataset.index;
  const cartItems = getLocalStorage("so-cart");

  if (newQty < 1 || isNaN(newQty)) {
    input.classList.add("input-error");
    return;
  } else {
    input.classList.remove("input-error");
  }

  // Update quantity in localStorage
  cartItems[index].quantity = newQty;
  setLocalStorage("so-cart", cartItems);

  // Update total price visually
  const totalElement = cardElement.querySelector(".item-total");
  totalElement.textContent = (cartItems[index].FinalPrice * newQty).toFixed(2);
}