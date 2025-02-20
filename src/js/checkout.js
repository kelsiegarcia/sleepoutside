import { checkoutProcess } from './checkoutProcess.mjs';  // Import checkoutProcess only once

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the checkout process
  checkoutProcess.init("so-cart", ".order-summary");
  checkoutProcess.calculateItemSummary();
  checkoutProcess.calculateOrderTotal();  // Ensure this is calculated when the page loads

  const checkoutForm = document.querySelector("form");
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    checkoutProcess.checkout(checkoutForm);
  });

  // Log the cart items directly from the checkoutProcess object
  console.log("Cart items:", checkoutProcess.list);

  // Event listener for zip code input
  const zipCodeInput = document.querySelector("#zip-code");
  if (zipCodeInput) {
    zipCodeInput.addEventListener("change", function (e) {
      const zipCode = e.target.value;
      checkoutProcess.calculateOrderTotal(zipCode);
    });
  }
});
