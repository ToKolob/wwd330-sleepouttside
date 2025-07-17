import { getLocalStorage } from '../js/utils.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const cart = getLocalStorage('so-cart') || [];
  console.log('Cart items:', cart);
  // TODO: Render cart to DOM
});

// Triggering Netlify deploy manually

// Force GitHub Netlify preview rebuild

// Force Netlify preview rebuild on correct branch
