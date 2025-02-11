import { productList } from "./productList.mjs";
import { loadHeaderFooter } from "../js/utils.mjs";

// Load header and footer
loadHeaderFooter();

// Get the category from the URL, if available, otherwise default to "tents"
const category = new URLSearchParams(window.location.search).get('category') || 'tents';

// Call the productList function to display products based on the category
productList(".product-list", category);
