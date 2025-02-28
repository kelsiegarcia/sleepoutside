import { getLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

export const checkoutProcess = {
  key: "so-cart",
  outputSelector: "",
  list: [],
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

    // console.log("Cart items:", this.list);

    this.calculateItemSummary();
  },

  calculateItemSummary: function () {
    this.list = getLocalStorage(this.key) || [];

    this.itemTotal = 0;
    this.quantity = 0;

    this.list.forEach((item, index) => {
      // console.log(`Item ${index + 1}:`, item);

      let itemPrice = parseFloat(item.FinalPrice);
      let itemQuantity = item.quantity || 1;

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

    // console.log("Total Items:", this.quantity, "Subtotal:", this.itemTotal);

    // Update UI
    document.querySelector(".quantity").textContent = `${this.quantity}`;
    document.querySelector(
      ".item-subtotal"
    ).textContent = `$${this.itemTotal.toFixed(2)}`;

    // Recalculate order total
    this.calculateOrderTotal();
  },

  calculateOrderTotal: function () {
    this.tax = this.itemTotal * 0.06; // 6% tax
    this.shipping = this.quantity > 0 ? 10 + (this.quantity - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // Update UI
    document.querySelector(".tax").textContent = `$${this.tax.toFixed(2)}`;
    document.querySelector(".shipping").textContent = `$${this.shipping.toFixed(
      2
    )}`;
    document.querySelector(
      ".order-total"
    ).textContent = `$${this.orderTotal.toFixed(2)}`;

    console.log("Updated Order Summary:", {
      itemTotal: this.itemTotal,
      tax: this.tax,
      shipping: this.shipping,
      orderTotal: this.orderTotal,
    });
  },

  // Correct async method declaration
  async checkout(form) {
    const formData = new FormData(form);
    const orderData = {
      orderDate: new Date().toISOString(),
      fname: formData.get("fname"),
      lname: formData.get("lname"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip"),
      cardNumber: formData.get("cardNumber"),
      expiration: formData.get("expiration"),
      code: formData.get("code"),
      items: this.packageItems(this.list),
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2),
    };

    console.log("Order Data:", orderData);

    // Use try-catch for error handling
    try {
      const response = await checkout(orderData); // Correct usage of await
      console.log("Order response:", response);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  },

  packageItems: function (items) {
    return items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));
  },
};
