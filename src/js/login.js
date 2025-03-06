import { login } from "./auth.mjs";
import { getParam } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#login-form");
    const redirect = getParam("redirect") || "/orders/";

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        
        await login({ email, password }, redirect);
    });
});
