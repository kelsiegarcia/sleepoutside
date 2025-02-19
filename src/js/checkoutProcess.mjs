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
    this.itemTotal = this.list.reduce((acc, item) => acc + item.FinalPrice, 0);
    this.quantity = this.list.length;


    document.querySelector(".quantity").textContent = `${this.quantity}`;
    document.querySelector(".item-subtotal").textContent = `$${this.itemTotal}`;
  },
  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    
    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page    
  }
  
}
//export default checkoutProcess;