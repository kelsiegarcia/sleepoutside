import { loadHeaderFooter } from "./utils.mjs";
import { checkoutProcess } from "./checkoutProcess.mjs";

loadHeaderFooter();
checkoutProcess.init("so-cart", ".order-summary");

console.log(checkoutProcess.itemTotal);