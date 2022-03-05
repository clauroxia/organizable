import DOMHandler from "./scripts/dom-handler.js";
import LoginPage from "./scripts/pages/login-page.js";
import HomePage from "./scripts/pages/home-page.js";
import { tokenKey } from "./scripts/config.js";
import { getUser } from "./scripts/services/users-service.js";


async function init() {
  try {
    const token = sessionStorage.getItem(tokenKey);
    if (!token) throw new Error();
    const user = await getUser();
    DOMHandler.load(HomePage);
  } catch (error) {
    sessionStorage.removeItem(tokenKey);
    DOMHandler.load(LoginPage);
  }
}

init();

DOMHandler.load(LoginPage);
