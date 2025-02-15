import { getData } from "./productData.mjs";

export function productList(selector, category) {
  getData(category).then((data) => {
    // const allowedProducts = ["880RR", "985RF", "985PR", "344YJ"];

    // let filteredProducts = data.filter((product) =>
    //   allowedProducts.includes(product.Id)
    // );

    const htmlItems = data.map((item) => productCardTemplate(item));
    document.querySelector(selector).innerHTML = htmlItems.join("");
  });
}

// productList.mjs
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}"/>
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
}
