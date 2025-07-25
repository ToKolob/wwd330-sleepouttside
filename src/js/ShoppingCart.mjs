import { getLocalStorage, renderListWithTemplate, loadTemplate } from './utils.mjs';

function cartItemTemplate(item) {
  return `
    <li class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-thumb" />
      <div class="cart-details">
        <h3>${item.name}</h3>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: $${item.price}</p>
      </div>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(listElementSelector, storageKey) {
    this.listElement = document.querySelector(listElementSelector);
    this.storageKey = storageKey;

    console.log("Cart.js is now wired up and ready         !");
    console.log(`ShoppingCart initialized with storage key: ${this.storageKey}`);
    console.log(`List element found: ${this.listElement} `);
    
    
    
  }

  async init() {
    const cartItems = getLocalStorage(this.storageKey) || [];
    if (cartItems.length === 0) {
      this.listElement.innerHTML = `<p>Your cart is empty.</p>`;
      return;
    }

    // Optionally load a wrapper template (not required for single items)
    // const cartTemplate = await loadTemplate('../partials/cartItem.html');

    renderListWithTemplate(cartItemTemplate, this.listElement, cartItems, 'afterbegin', true);
  }
}