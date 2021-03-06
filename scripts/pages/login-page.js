import { input } from "../components/inputs.js";
import { login } from "../services/session-service.js";
import STORE from "../store.js";
import HomePage from "./home-page.js";
import DOMHandler from "../dom-handler.js";
import SignUpPage from "./signup-page.js";
import { getBoards } from "../services/boards-service.js";


function render() {
  const { loginError } = LoginPage.state;
  return `<body>
  <section class="section-lg">
    <div class="container flex flex-column gap-8 items-center">
      <img src="/icons/organizable.svg" alt="rankable logo" />
      <h1 class="heading">Login</h1>
      <form action="" class="full-width container-sm flex flex-column gap-4 js-login-form">
        ${input({
          label: "Username",
          id: "username",
          placeholder: "username",
          icon: "/icons/username.svg",
          required: true,
          // error: this.state.errors.username,
        })}
        ${input({
          label: "Password",
          id: "password",
          placeholder: "******",
          icon: "/icons/password.svg",
          required: true,
          // error: this.state.errors.password,
          type: "password"
        })}
        ${loginError ? `<p class="text-center error-300">${loginError}</p>` : ""}
        <button type="submit" class="button button--secondary width-full">
          Login
        </button>
      </form>
      <a href="#" class="primary-400 js-signup-link">Create Account</a>
    </div>
  </section>
</body>`
}

function listenSubmitForm() {
  const form = document.querySelector(".js-login-form");
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { username, password } = event.target;
      const credentials = {
        username: username.value,
        password: password.value
      };

      STORE.user = await login(credentials);
      STORE.boards = await getBoards();
      // console.log(STORE.user);
      console.log(STORE.boards);
      DOMHandler.load(HomePage);
    } catch(error) {
      console.log(LoginPage.state.loginError);
      DOMHandler.reload();
    }
  });
}

function listenSignUp() {
  const link = document.querySelector(".js-signup-link");
  link.addEventListener("click", (event) => {
    event.preventDefault();
    try {
      DOMHandler.load(SignUpPage);
    } catch (error) {
      console.log(error.message);
    }
  });
}

const LoginPage = {
  toString() {
    return render();
  },

  addListeners() {
    listenSubmitForm();
    listenSignUp();
  },

  state: {
    errors: {},
  },
  
};

export default LoginPage;