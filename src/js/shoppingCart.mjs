import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cart = getLocalStorage("so-cart");
  const cartList = document.querySelector(".product-list");
  renderListWithTemplate(cartCardTemplate, cartList, cart);
}

function cartCardTemplate(product) {
  return `
		<li class="product-card">
			<h3>${product.name}</h3>
			<p>Price: $${product.price}</p>
			<p>Quantity: ${product.quantity}</p>
		</li>
	`;
}
