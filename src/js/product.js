import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

loadHeaderFooter();

const productId = getParam("product");
productDetails(productId);

import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

export function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");

  // Ensure cart is always an array
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Add product to cart
  cart.push(product);

  setLocalStorage("so-cart", cart);
}

// Add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
