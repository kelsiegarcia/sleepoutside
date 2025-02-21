import { productList } from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
document.querySelector(".title").innerText = category;

// Ensure category is valid before making the request
if (category) {
  productList(".product-list", category);
} else {
  document.querySelector(".product-list").innerHTML =
    "<p>Please select a category.</p>";
}
