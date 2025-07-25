// src/js/ShoppingCart.mjs
import { getLocalStorage, renderListWithTemplate, loadTemplate } from '../../utils.mjs';

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
  constructor(listElementSelector, storageKey = 'so-cart') {
    this.listElement = document.querySelector(listElementSelector);
    this.storageKey = storageKey;
  }

  async init() {
    const cartItems = getLocalStorage(this.storageKey) || [];
    console.log('Cart loaded:', cartItems);

    if (cartItems.length === 0) {
      this.listElement.innerHTML = `<p>Your cart is empty.</p>`;
      return;
    }

    // Uncomment this if you want to use an external template file
    // const cartTemplate = await loadTemplate('../partials/cartItem.html');

    renderListWithTemplate(cartItemTemplate, this.listElement, cartItems, 'afterbegin', true);
  }
}