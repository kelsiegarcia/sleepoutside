import { loginRequest } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { jwtDecode } from "jwt-decode"; 

const tokenKey = "so-token";

export async function login(creds, redirect = "/") {
    try {
      const token = await loginRequest(creds);
      console.log("Received token from loginRequest:", token);  // Debugging
      if (token) {
        setLocalStorage(tokenKey, token);  // Ensure the token is stored correctly
        console.log("Token saved to localStorage:", localStorage.getItem(tokenKey));  // Check saved token
        window.location = redirect;
      } else {
        alert("Login failed: No token received");
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  }
  
export function isTokenValid(token) {
    if (!token) return false;
    const decoded = jwtDecode(token); 
    return decoded.exp * 1000 > new Date().getTime();
}

export function checkLogin() {
  const token = getLocalStorage(tokenKey);
  const valid = isTokenValid(token);
  if (!valid) {
    localStorage.removeItem(tokenKey);
    const location = window.location;
    window.location = `/login/index.html?redirect=${location.pathname}`;
  } else {
    return token;
  }
}


