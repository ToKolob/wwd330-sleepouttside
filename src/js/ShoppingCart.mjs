import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
  loadTemplate
} from "../../utils.mjs";

// 🧩 HTML template for each cart item
function cartItemTemplate(item) {
  const imageSrc = item.Image || (item.Images?.PrimaryMedium ?? "/images/default.jpg");
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(item.FinalPrice * (item.quantity || 1));

  return `
    <li class="cart-item">
      <img src="${imageSrc}" alt="${item.Name}" class="cart-thumb" />
      <div class="cart-details">
        <h3>${item.Name}</h3>
        <p>Color: ${item.Colors?.[0]?.ColorName ?? "N/A"}</p>
        <p>Quantity: ${item.quantity || 1}</p>
        <p>Total: ${formattedPrice}</p>
      </div>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(listElementSelector, storageKey = "so-cart") {
    this.listElement = document.querySelector(listElementSelector);
    this.storageKey = storageKey;
    this.total = 0;
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

    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      cartItems,
      "afterbegin",
      true
    );

    this.calculateTotal(cartItems);
  }

  /**
   * Adds an item to the cart, merging quantities if it already exists
   */
  static addItem(item) {
    const cartItems = getLocalStorage("so-cart") || [];

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
    console.log("✅ Cart updated:", cartItems);
  }

  /**
   * Clears the cart completely
   */
  static clearCart() {
    setLocalStorage("so-cart", []);
    console.log("🧹 Cart cleared");
  }

  /**
   * Calculates total cost of items in cart
   */
  calculateTotal(cartItems) {
    const amounts = cartItems.map(item =>
      item.FinalPrice * (item.quantity || 1)
    );
    this.total = amounts.reduce((sum, val) => sum + val, 0);

    const totalDisplay = document.querySelector(".list-total");
    if (totalDisplay) {
      const formattedTotal = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
      }).format(this.total);

      totalDisplay.innerText = `Total: ${formattedTotal}`;
    }
  }
}