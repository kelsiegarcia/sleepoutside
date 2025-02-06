import { productList } from "./productList.mjs";
import { loadHeaderFooter } from "../js/utils.mjs";

loadHeaderFooter();

function getProducts() {
  productList(".product-list", "tents");
}

getProducts();
