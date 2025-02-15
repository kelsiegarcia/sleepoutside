import { productList } from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

document.querySelector(".title").innerText = category;

// call the productList function to display products based on the category
productList(".product-list", category);
