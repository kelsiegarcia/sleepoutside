import { checkoutProcess } from "./checkoutProcess.mjs"; // Import checkoutProcess only once
import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the checkout process
  checkoutProcess.init("so-cart", ".order-summary");

  // Ensure item summary and order total are calculated on page load
  checkoutProcess.calculateItemSummary();
  checkoutProcess.calculateOrderTotal();

  // Attach event listener to the form submit
  const checkoutForm = document.querySelector("form");
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission
    checkoutProcess.checkout(checkoutForm); // Call checkout method
  });

  // Log the cart items directly from the checkoutProcess object
  console.log("Cart items:", checkoutProcess.list);

  // Event listener for zip code input
  const zipCodeInput = document.querySelector("#zip-code");
  if (zipCodeInput) {
    zipCodeInput.addEventListener("change", function (e) {
      const zipCode = e.target.value;
      checkoutProcess.calculateOrderTotal(zipCode); // Recalculate total based on zip code
    });
  }
});

loadHeaderFooter();
