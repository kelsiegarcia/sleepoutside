import { productList } from "./productList.mjs";
import { getParam,loadHeaderFooter } from "../js/utils.mjs";

loadHeaderFooter();

const category = getParam("category");

// call the productList function to display products based on the category
productList(".product-list", category);
