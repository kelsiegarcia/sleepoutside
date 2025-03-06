import { convertToJson } from "./externalServices.mjs";
import { getLocalStorage } from "./utils.mjs";

export async function fetchOrders() {
  
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getLocalStorage('so-token')}`,
    },
  };
  const response = await fetch("https://wdd330-backend.onrender.com/orders", options).then(convertToJson);
  return response;
}

export default async function currentOrders(selector) {
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("so-token");
    console.log("Token from localStorage:", token);  

    if (!token) {
      console.log("No valid token, redirecting to login...");
      window.location = "/login/index.html";  
      return;
    }

    // Proceed with fetching orders if token exists
    console.log("Token being sent:", token);  

    const orders = await fetchOrders(token);
    const parent = document.querySelector(`${selector} tbody`);
    parent.innerHTML = orders.map(orderTemplate).join("");  // Display the orders
  } catch (err) {
    console.error("Error fetching orders:", err);
  }
}

function orderTemplate(order) {
  return `
    <tr>
      <td>${order.id}</td>
      <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
      <td>${order.items.length}</td>
      <td>${order.orderTotal}</td>
    </tr>
  `;
}