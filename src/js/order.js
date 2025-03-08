import { checkLogin } from "./auth.mjs";
import { fetchOrders } from "./currentOrders.mjs";

document.addEventListener("DOMContentLoaded", async () => {
// Protect the page  
    checkLogin();  
    const tableBody = document.querySelector("#ordersTable tbody");
  const orders = await fetchOrders();
  console.log("Fetched orders:", orders);
  // Ensure orders is an array before calling forEach
  if (Array.isArray(orders)) {

    orders.forEach(order => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${order.id}</td>
        <td>${order.fname} ${order.lname}</td>
        <td>${order.street}, ${order.city}, ${order.state}</td>
      `;

      tableBody.appendChild(row);
    });
  } else {
    console.error("Expected an array but got:", orders);
  }
});
