import { loadHeaderFooter } from "./utils.mjs";
import { checkoutProcess } from "./checkoutProcess.mjs";

loadHeaderFooter();
checkoutProcess.init("so-cart", ".order-summary");
checkoutProcess.calculateOrdertotal();

//console.log(checkoutProcess.itemTotal);