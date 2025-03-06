import { checkLogin } from "./auth.mjs";
import { fetchOrders } from "./currentOrders.mjs";

document.addEventListener("DOMContentLoaded", async () => {
// Protect the page  
    checkLogin();  
  const ordersList = document.querySelector("#orders-list");
  const orders = await fetchOrders();
  console.log("Fetched orders:", orders);
  // Ensure orders is an array before calling forEach
  if (Array.isArray(orders)) {
    orders.forEach(order => {
      const li = document.createElement("li");
      li.textContent = `Order #${order.id}: ${order.fname} ${order.lname} - ${order.street}, ${order.city}`;
      ordersList.appendChild(li);
    });
  } else {
    console.error("Expected an array but got:", orders);
  }
});
