import { getLocalStorage, setClick } from "./utils.mjs";
import { loadHeaderFooter } from "../js/utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

loadHeaderFooter();
shoppingCart();

// Function to render cart contents and update cart icon
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  console.log("Cart Items from Local Storage:", cartItems);

  const cartFooter = document.querySelector(".cart-footer");

  // Always update cart icon 
  updateCartIcon(cartItems.length);  

  if (!cartItems.length) {
    document.querySelector(".product-list").innerHTML =
      "<p>No items in cart</p>";
    cartFooter.classList.add("hide");
    return;
  }

  cartFooter.classList.remove("hide");

  const validItems = cartItems.filter((item) => item && item.Id);
  console.log("Valid Items Processed:", validItems);

  const htmlItems = validItems.map(cartItemTemplate).join("");
  document.querySelector(".product-list").innerHTML = htmlItems;

  setTotal(validItems);

  // Add event listeners to the remove buttons
  addRemoveEventListeners(); 
}

// Always update cart icon with the number of items in the cart
function updateCartIcon(itemCount) {
  const cartItemCountElement = document.querySelector(".cart-item-count");
  if (cartItemCountElement) {
    // If no items in the cart, hide the number
    if (itemCount === 0) {
      cartItemCountElement.style.display = "none";
    } else {
      cartItemCountElement.style.display = "flex";  
      cartItemCountElement.textContent = itemCount;  
    }
  }
}

// Update the total price
function setTotal(cartItems) {
  const total = cartItems.reduce((sum, item) => {
    const price = item.FinalPrice || 0;
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  console.log("Cart Total:", total.toFixed(2));
  document.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
}

// Template for rendering a cart item
function cartItemTemplate(item) {
  if (!item) {
    console.error("Undefined cart item detected:", item);
    return `<li class="cart-card divider">Error displaying item</li>`;
  }

  const imageUrl =
    item.Images?.PrimarySmall || item.Image || "default-image.jpg";  // Fallback image
  const color = item.Colors?.[0]?.ColorName || "Unknown Color";
  const price = item.FinalPrice
    ? `$${item.FinalPrice.toFixed(2)}`
    : "Price unavailable";
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
    <button class="remove-item" data-id="${item.Id}">X</button>
  </li>`;
}

// Attach event listeners to the remove buttons
function addRemoveEventListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");

  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const itemId = e.target.dataset.id; 
      removeItemFromCart(itemId);
    });
  });
}

// Remove an item from the cart and re-render the cart
function removeItemFromCart(itemId) {
  const cartItems = getLocalStorage("so-cart") || [];

  // Remove the item with the matching ID
  const updatedCartItems = cartItems.filter((item) => item.Id !== itemId);

  // Save the updated cart back to localStorage
  localStorage.setItem("so-cart", JSON.stringify(updatedCartItems));

  // Re-render the cart and update the cart icon
  renderCartContents();
}

// Initialize the cart on page load
renderCartContents();

// Always update the cart icon with the correct count from localStorage
updateCartIcon(getLocalStorage("so-cart")?.length || 0);

// Listen for cart changes 
window.addEventListener("storage", () => {
  updateCartIcon(getLocalStorage("so-cart")?.length || 0);
});

setClick(".checkout-button", () => {
  window.open("/checkout/index.html", "_self");
});
