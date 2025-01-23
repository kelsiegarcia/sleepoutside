import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  let products = getLocalStorage("so-cart") || [];

  if(products.some((p) => p.ProductID === product.ProductID)) {
    products = products.map((p) => {
      if(p.ProductID === product.ProductID) {
        p.Quantity++;
        return p;
      }
      return p;
    });
  } 
  else products.push(product);

  setLocalStorage("so-cart", products);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
