const baseURL = "https://wdd330-backend.onrender.com";

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  return response.json();
}

export async function checkout(orderData) {
  return fetchJSON(`${baseURL}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
}

export async function getProductsByCategory(category) {
  const data = await fetchJSON(`${baseURL}/products/search/${category}`);
  return data.Result;
}

export async function findProductById(id) {
  const product = await fetchJSON(`${baseURL}/product/${id}`);
  return product.Result;
}
