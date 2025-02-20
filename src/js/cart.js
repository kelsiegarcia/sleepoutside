import { getLocalStorage, setClick } from "./utils.mjs";
import { loadHeaderFooter } from "../js/utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

loadHeaderFooter();
shoppingCart();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  console.log("Cart Items from Local Storage:", cartItems);

  const cartFooter = document.querySelector(".cart-footer");

  if (!cartItems.length) {
    document.querySelector(".product-list").innerHTML = "<p>No items in cart</p>";
    cartFooter.classList.add("hide"); 
    return;
  }

  cartFooter.classList.remove("hide"); 

  const validItems = cartItems.filter(item => item && item.Id);
  console.log("Valid Items Processed:", validItems);

  const htmlItems = validItems.map(cartItemTemplate).join("");
  document.querySelector(".product-list").innerHTML = htmlItems;

  setTotal(validItems);
}



function setTotal(cartItems) {
  const total = cartItems.reduce((sum, item) => {
    const price = item.FinalPrice || 0;
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  console.log("Cart Total:", total.toFixed(2));
  document.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
}



function cartItemTemplate(item) {
  if (!item) {
    console.error("Undefined cart item detected:", item);
    return `<li class="cart-card divider">Error displaying item</li>`;
  }

  const imageUrl = item.Images?.PrimarySmall || item.Image || "default-image.jpg"; // Fallback image
  const color = item.Colors?.[0]?.ColorName || "Unknown Color";
  const price = item.FinalPrice ? `$${item.FinalPrice.toFixed(2)}` : "Price unavailable";
  const quantity = item.quantity || 1;

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${imageUrl}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${color}</p>
    <p class="cart-card__quantity">Qty: ${quantity}</p>
    <p class="cart-card__price">${price}</p>
  </li>`;
}


renderCartContents();

setClick(".checkout-button", () => {
  window.open("/checkout/index.html", "_self");
});