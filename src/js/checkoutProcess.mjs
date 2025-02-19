import { getLocalStorage } from "./utils.mjs";

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
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
export default checkoutProcess;