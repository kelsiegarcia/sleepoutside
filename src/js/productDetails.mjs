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
  let cartContents = getLocalStorage("so-cart") || []; 

  const existingProduct = cartContents.find((item) => item.Id === product.Id);

  if (existingProduct) {
    existingProduct.quantity = (existingProduct.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cartContents.push(product);
  }

  setLocalStorage("so-cart", cartContents);
  animateCartIcon(); 
  alertMessage(`${product.NameWithoutBrand} added to cart!`);
}

function animateCartIcon() {
  const cartIcon = document.querySelector(".cart"); 
  if (cartIcon) {
    cartIcon.classList.add("cart-bounce");
    setTimeout(() => {
      cartIcon.classList.remove("cart-bounce");
    }, 500); 
  }
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
