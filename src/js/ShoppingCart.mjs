// ShoppingCart.mjs
import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
  loadTemplate
} from "../../utils.mjs";

/**
 * Generates an HTML string for a cart item
 * @param {Object} item
 * @returns {string}
 */
function cartItemTemplate(item) {
  const imageSrc = item.Image || "/images/default.jpg";
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(item.FinalPrice);

  return `
    <li class="cart-item">
      <img src="${imageSrc}" alt="${item.Name}" class="cart-thumb" />
      <div class="cart-details">
        <h3>${item.Name}</h3>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: ${formattedPrice}</p>
      </div>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(listElementSelector, storageKey = "so-cart") {
    this.listElement = document.querySelector(listElementSelector);
    this.storageKey = storageKey;
    console.log("🛒 ShoppingCart initialized");
  }

  async init() {
    const cartItems = getLocalStorage(this.storageKey) || [];

    if (!this.listElement) {
      console.error("❌ List element not found.");
      return;
    }

    if (cartItems.length === 0) {
      this.listElement.innerHTML = `<p>Your cart is empty.</p>`;
      return;
    }

    // If using an external template, switch this line:
    // const cartTemplate = await loadTemplate('../partials/cartItem.html');
    // renderListWithTemplate(cartTemplate, this.listElement, cartItems, 'afterbegin', true);

    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      cartItems,
      "afterbegin",
      true
    );
  }

  /**
   * Adds an item to the cart, merging if duplicate exists
   * @param {Object} item
   */
  static addItem(item) {
    const cartItems = getLocalStorage("so-cart") || [];

    // Check if the item already exists by name and color (if available)
    const existingIndex = cartItems.findIndex(cartItem =>
      cartItem.Name === item.Name &&
      JSON.stringify(cartItem.Colors) === JSON.stringify(item.Colors)
    );

    if (existingIndex > -1) {
      cartItems[existingIndex].quantity += item.quantity;
    } else {
      cartItems.push(item);
    }

    setLocalStorage("so-cart", cartItems);
    console.log("Updated cart:", cartItems);
  }

  /**
   * Clears the cart completely
   */
  static clearCart() {
    setLocalStorage("so-cart", []);
    console.log("Cart cleared");
  }
}