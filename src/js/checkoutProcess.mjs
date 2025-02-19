import { getLocalStorage } from "./utils.mjs";

export const checkoutProcess = {
    key: "so-cart",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    quantity: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    },
  calculateItemSummary: function() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    this.itemTotal = this.list.reduce((acc, item) => acc + (item.FinalPrice * item.quantity), 0);
    this.quantity = this.list.reduce((acc, item) => acc + item.quantity, 0);


    document.querySelector(".quantity").textContent = `${this.quantity}`;
    document.querySelector(".item-subtotal").textContent = `$${this.itemTotal}`;
  },
  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.tax = this.itemTotal * 0.6;
    document.querySelector(".tax").textContent = `$${this.tax?.toFixed(2)}`;

    // shipping is $10 for the first item and $2 for each additional item
    this.shipping = 10 + (this.quantity > 1 ? (this.quantity - 1) * 2 : 0);
    document.querySelector(".shipping").textContent = `$${this.shipping?.toFixed(2)}`;

    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    document.querySelector(".order-total").textContent = `$${this.orderTotal?.toFixed(2)}`;

    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page    
  }
  
}
//export default checkoutProcess;