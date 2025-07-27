import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  return items.map(item => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.quantity || 1,
  }));
}

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
    this.calculateItemSummary();
    this.calculateOrderTotal();
  }

  renderCartItems() {
    const cartContainer = document.querySelector(this.outputSelector + " .checkout-cart");
    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    this.list.forEach(item => {
      const itemEl = document.createElement("div");
      itemEl.classList.add("checkout-item");
      itemEl.innerHTML = `
        <span class="item-name">${item.Name}</span>
        <span class="item-qty">Qty: ${item.quantity || 1}</span>
        <span class="item-price">₹${item.FinalPrice.toFixed(2)}</span>
        <span class="item-subtotal">Subtotal: ₹${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</span>
      `;
      cartContainer.appendChild(itemEl);
    });
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(this.outputSelector + " #cartTotal");
    const itemNumElement = document.querySelector(this.outputSelector + " #num-items");

    const totalItems = this.list.reduce((sum, item) => sum + (item.quantity || 1), 0);
    itemNumElement.innerText = totalItems;

    const amounts = this.list.map(item => item.FinalPrice * (item.quantity || 1));
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);

    summaryElement.innerText = `₹${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.orderTotal = parseFloat(this.itemTotal + this.tax + this.shipping);

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const taxEl = document.querySelector(`${this.outputSelector} #tax`);
    const shippingEl = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotalEl = document.querySelector(`${this.outputSelector} #orderTotal`);

    taxEl.innerText = `₹${this.tax.toFixed(2)}`;
    shippingEl.innerText = `₹${this.shipping.toFixed(2)}`;
    orderTotalEl.innerText = `₹${this.orderTotal.toFixed(2)}`;
  }

  async checkout() {
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);

    try {
      const response = await services.checkout(order);
      console.log(response);

      alert("Order placed successfully!");

      // ✅ Clear cart in localStorage
      localStorage.removeItem(this.key);

      // Clear cart from memory and localStorage
      this.list = [];
      localStorage.removeItem(this.key);
      setLocalStorage(this.key, this.list); // Optional but helpful if other components read from this

      // Rerender empty cart before redirect
      this.renderCartItems();
      this.calculateItemSummary();
      this.calculateOrderTotal();

      // ✅ Optionally refresh cart.html if you're on it
      if (window.location.pathname.includes("cart.html")) {
        window.location.reload();
      }

      // ✅ Redirect to homepage
      window.location.href = "/index.html"; // modify path if needed
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  }
}