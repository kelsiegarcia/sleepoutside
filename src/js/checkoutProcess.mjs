import { getLocalStorage } from './utils.mjs'; 

export const checkoutProcess = {
  key: "so-cart",
  outputSelector: "",
  list: [], // Default to empty array
  itemTotal: 0,
  quantity: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,

  // Initialize the checkout process
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(this.key) || [];

    console.log("Cart items:", this.list); // Log full cart contents

    this.calculateItemSummary();
  },

  // Calculate the item summary by fetching from local storage
  calculateItemSummary: function () {
    // Retrieve latest cart data
    this.list = getLocalStorage(this.key) || [];
    
    this.itemTotal = 0;
    this.quantity = 0;

    this.list.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, item); // Log each item
      
      let itemPrice = parseFloat(item.FinalPrice);
      let itemQuantity = 1;

      if (isNaN(itemPrice)) {
        console.warn(`Item ${index + 1} has invalid price:`, item.FinalPrice);
        itemPrice = 0;
      }
      
      if (isNaN(itemQuantity)) {
        console.warn(`Item ${index + 1} has invalid quantity:`, item.quantity);
        itemQuantity = 0;
      }

      this.itemTotal += itemPrice * itemQuantity;
      this.quantity += itemQuantity;
    });

    console.log("Total Items:", this.quantity, "Subtotal:", this.itemTotal);

    // Update UI
    document.querySelector(".quantity").textContent = `${this.quantity}`;
    document.querySelector(".item-subtotal").textContent = `$${this.itemTotal.toFixed(2)}`;

    // Recalculate order total
    this.calculateOrderTotal();
  },

  // Calculate and update the shipping, tax, and order total
  calculateOrderTotal: function () {
    this.tax = this.itemTotal * 0.06; // 6% tax
    this.shipping = this.quantity > 0 ? 10 + (this.quantity - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // Update UI
    document.querySelector(".tax").textContent = `$${this.tax.toFixed(2)}`;
    document.querySelector(".shipping").textContent = `$${this.shipping.toFixed(2)}`;
    document.querySelector(".order-total").textContent = `$${this.orderTotal.toFixed(2)}`;

    console.log("Updated Order Summary:", {
      itemTotal: this.itemTotal,
      tax: this.tax,
      shipping: this.shipping,
      orderTotal: this.orderTotal,
    });
  },
};
