// import { findProductById } from "./externalServices.mjs";
// import { getLocalStorage, setLocalStorage } from "./utils.mjs";
// import { loadHeaderFooter, alertMessage } from "./utils.mjs";

// let product = {};

// export default async function productDetails(productId) {
//   // get the details for the current product. findProductById will return a promise! use await or .then() to process it
//   product = await findProductById(productId);
//   // once we have the product details we can render out the HTML
//   renderProductDetails();
//   // once the HTML is rendered we can add a listener to Add to Cart button
//   document
//     .getElementById("addToCart")
//     .addEventListener("click", addProductToCart);
// }

// export function addProductToCart(product) {
//   let cartContents = getLocalStorage("so-cart");

//   if (!cartContents) {
//     cartContents = [];
//   }
//   // Check if product is already in cart
//   const existingProduct = cartContents.find((item) => item.Id === product.Id);
//   if (existingProduct) {
//     // Increment quantity
//     existingProduct.quantity = (existingProduct.quantity || 1) + 1;
//   } else {
//     // Add product to cart
//     product.quantity = 1;
//     cartContents.push(product);
//   }

//   setLocalStorage("so-cart", cartContents);
//   alertMessage(`${product.NameWithoutBrand} added to cart!`);
// }

// // Add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // Render product details
// function renderProductDetails() {
//   document.querySelector("#productName").innerText = product.Brand.Name;
//   document.querySelector("#productNameWithoutBrand").innerText =
//     product.NameWithoutBrand;
//   document.querySelector("#productImage").src = product.Images.PrimaryLarge;
//   document.querySelector("#productImage").alt = product.Name;
//   document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
//   document.querySelector("#productColorName").innerText =
//     product.Colors[0].ColorName;
//   document.querySelector("#productDescriptionHtmlSimple").innerHTML =
//     product.DescriptionHtmlSimple;
//   document.querySelector("#addToCart").dataset.id = product.Id;
// }

// loadHeaderFooter();

import { findProductById } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter, alertMessage } from "./utils.mjs";

export default async function productDetails(productId) {
  try {
    const product = await findProductById(productId); // Local product variable
    renderProductDetails(product);

    // Add event listener using an anonymous function (or addToCartHandler)
    document.getElementById("addToCart").addEventListener("click", () => {
      addProductToCart(product);
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    // Handle error appropriately
  }
}

export function addProductToCart(product) {
  let cartContents = getLocalStorage("so-cart") || []; // Default empty array

  const existingProduct = cartContents.find((item) => item.Id === product.Id);

  if (existingProduct) {
    existingProduct.quantity = (existingProduct.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cartContents.push(product);
  }

  setLocalStorage("so-cart", cartContents);
  alertMessage(`${product.NameWithoutBrand} added to cart!`);
}

function renderProductDetails(product) {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

loadHeaderFooter();
