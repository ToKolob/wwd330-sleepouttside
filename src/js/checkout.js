import { CheckoutProcess } from "../js/CheckoutProcess.mjs";
import { loadHeaderFooter } from "../js/utils.mjs";
loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
  checkout.init();

  const form = document.getElementById("checkout-form");
  const placeOrderBtn = document.getElementById("place-order-btn");

  placeOrderBtn?.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default button behavior

    // Validate form using browser validation API
    const isValid = form.checkValidity();
    form.reportValidity(); // Show validation messages if any fields are invalid

    if (!isValid) return; // Don't continue if form is invalid

    // Confirm and proceed with checkout
    if (confirm("Confirm placing your order?")) {
      checkout.checkout();
    }
  });
});