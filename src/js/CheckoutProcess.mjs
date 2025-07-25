import { getLocalStorage } from "./utils.mjs"; 

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.renderCartItems();
    this.calculateItemSubTotal();
    this.addQuantityListeners();
  }

  renderCartItems() {
    const cartContainer = document.querySelector(`${this.outputSelector} .checkout-cart`);
    cartContainer.innerHTML = ""; // clear before rendering

    this.list.forEach(item => {
      const itemEl = document.createElement("div");
      itemEl.classList.add("checkout-item");
      itemEl.innerHTML = `
        <span>${item.Name}</span>
        <span>Price: $${item.FinalPrice}</span>
        <label>Qty: 
          <input type="number" min="1" value="${item.quantity}" data-id="${item.Id}" class="item-qty" />
        </label>
      `;
      cartContainer.appendChild(itemEl);
    });
  }

  addQuantityListeners() {
    const qtyInputs = document.querySelectorAll(`${this.outputSelector} .item-qty`);
    qtyInputs.forEach(input => {
      input.addEventListener("input", () => {
        const itemId = input.dataset.id;
        const newQty = parseInt(input.value);

        // update quantity in list
        const item = this.list.find(product => product.Id === itemId);
        if (item && newQty > 0) {
          item.quantity = newQty;
          this.calculateItemSubTotal();
        }
      });
    });
  }

  calculateItemSubTotal() {
    this.itemTotal = 0;
    let numItems = 0;

    this.list.forEach(item => {
      this.itemTotal += item.FinalPrice * item.quantity;
      numItems += item.quantity;
    });

    const cartTotalEl = document.querySelector(`${this.outputSelector} #cartTotal`);
    const itemCountEl = document.querySelector(`${this.outputSelector} #numberItems`);

    if (cartTotalEl) cartTotalEl.innerText = `$${this.itemTotal.toFixed(2)}`;
    if (itemCountEl) itemCountEl.innerText = numItems;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.12;
    this.shipping = this.itemTotal > 0 ? 8.5 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const taxEl = document.querySelector(`${this.outputSelector} #tax`);
    const shippingEl = document.querySelector(`${this.outputSelector} #shipping`);
    const totalEl = document.querySelector(`${this.outputSelector} #total`);

    if (taxEl) taxEl.innerText = `$${this.tax.toFixed(2)}`;
    if (shippingEl) shippingEl.innerText = `$${this.shipping.toFixed(2)}`;
    if (totalEl) totalEl.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
}