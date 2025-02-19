import { getLocalStorage, setClick } from "./utils.mjs";
import { loadHeaderFooter } from "../js/utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

loadHeaderFooter();
shoppingCart();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems) {
    document.querySelector(".product-list").innerHTML = "<p>No items in cart</p>";
    return;
  } else {
    const uniqueItems = Array.from(
      new Set(cartItems.map((item) => item.Id))
    ).map((id) => cartItems.find((item) => item.Id === id));
    const htmlItems = uniqueItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    setTotal(uniqueItems);
  }
}

function setTotal(uniqueItems) {
  let total = uniqueItems.reduce((acc, item) => acc + item.FinalPrice, 0);
  let cartFooter = document.querySelector(".cart-footer");

  if(total > 0){
    cartFooter.classList.remove("hide");

    document.querySelector(".cart-total-value").innerText = `$${total}`;
  }
  else{
    cartFooter.classList.remove("hide");
    document.querySelector(".cart-total-value").innerText = "";
  }  
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

setClick(".checkout-button", () => {
  window.open("/checkout/index.html", "_self");
});