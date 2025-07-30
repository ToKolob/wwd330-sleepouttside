import { getLocalStorage, setLocalStorage, removeItemFromStorage } from './utils.mjs';

export class CheckoutProcess {
  constructor(cartKey, summarySelector) {
    this.cartKey = cartKey;
    this.summaryElement = document.querySelector(summarySelector);
    this.cartItems = [];
  }

  // Initialize checkout by loading cart from localStorage
  init() {
    this.cartItems = getLocalStorage(this.cartKey) || [];
    this.displayCartSummary();
  }

  // Render cart summary on the checkout page
  displayCartSummary() {
    if (!this.summaryElement) return;

    this.summaryElement.innerHTML = '';

    if (this.cartItems.length === 0) {
      this.summaryElement.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }

    let total = 0;

    this.cartItems.forEach(item => {
      const itemTotal = item.FinalPrice * item.Quantity;
      total += itemTotal;

      const itemEl = document.createElement('div');
      itemEl.classList.add('cart-item');
      itemEl.innerHTML = `
        <p>${item.Name} × ${item.Quantity}</p>
        <p>₹${itemTotal}</p>
      `;
      this.summaryElement.appendChild(itemEl);
    });

    const totalEl = document.createElement('div');
    totalEl.classList.add('cart-total');
    totalEl.innerHTML = `<strong>Total: ₹${total}</strong>`;
    this.summaryElement.appendChild(totalEl);
  }

  // Handle order placement
  checkout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    // Simulate order submission
    console.log('Placing order:', this.cartItems);

    // Save final order separately for confirmation page
    setLocalStorage('placed-order', this.cartItems);

    // Clear the original cart
    setLocalStorage(this.cartKey, []);
    this.cartItems = [];
    this.displayCartSummary();

    alert('Order placed successfully!');

    // Redirect to confirmation page
    window.location.href = '/checkout/success.html';
  }
}