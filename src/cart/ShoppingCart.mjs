import { getLocalStorage } from './utils.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const cartItems = getLocalStorage('so-cart') || [];
  console.log("Cart loaded:", cartItems);
  // TODO: Render cart items to DOM
});