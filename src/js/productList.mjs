import { getProductsByCategory } from "./externalServices.mjs";

export function productList(selector, category) {
  getProductsByCategory(category)
    .then((data) => {
      if (!data || data.length === 0) {
        document.querySelector(selector).innerHTML =
          "<p>No products found in this category.</p>";
        return;
      }

      const htmlItems = data.map((item) => productCardTemplate(item));
      document.querySelector(selector).innerHTML = htmlItems.join("");
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      document.querySelector(selector).innerHTML =
        "<p>Failed to load products. Please try again later.</p>";
    });
}

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}
