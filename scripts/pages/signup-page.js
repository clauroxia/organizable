import { input } from "../components/inputs.js";
import LoginPage from "./login-page.js";
import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import HomePage from "./home-page.js";
import { createUser } from "../services/users-service.js";
import { getBoards } from "../services/boards-service.js";

function render() {
  return `<body>
  <section class="section-lg">
    <div class="container flex flex-column gap-8 items-center">
      <img src="/icons/organizable.svg" alt="rankable logo" />
      <h1 class="heading">Create Account</h1>
      <form action="" class="full-width container-sm flex flex-column gap-4 js-signup-form">
        ${input({
          label: "Username",
          id: "username",
          placeholder: "username",
          icon: "/icons/username.svg",
          required: true,
        })}
        ${input({
          label: "Email",
          id: "email",
          placeholder: "email",
          icon: "/icons/email.svg",
          required: true,
        })}
        ${input({
          label: "First Name",
          id: "first_name",
          placeholder: "first name",
          icon: "/icons/name.svg",
          required: true,
        })}
        ${input({
          label: "Last Name",
          id: "last_name",
          placeholder: "last name",
          icon: "/icons/name.svg",
          required: true,
        })}
        ${input({
          label: "Password",
          id: "password",
          placeholder: "******",
          icon: "/icons/password.svg",
          required: true,
          type: "password"
        })}
       
        <button type="submit" class="button button--secondary width-full">
          Create Account
        </button>
      </form>
      <a href="#" class="primary-400 js-login-link">Login</a>
    </div>
  </section>
</body>
`;
}

function listenSubmitForm() {
  const form = document.querySelector(".js-signup-form");

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { username, email, first_name, last_name, password } = event.target;
      const credentials = {
        username: username.value,
        email: email.value,
        first_name: first_name.value,
        last_name: last_name.value,
        password: password.value,
      };
      const user = await createUser(credentials);
      STORE.user = user;
      const boards = await getBoards();
      STORE.boards = boards;
      // console.log(STORE.user);
      DOMHandler.load(HomePage);

    } catch (error) {
      SignUpPage.state.signupError = error.message;
      DOMHandler.reload();
    }
  });
}

function listenLogin() {
  const link = document.querySelector(".js-login-link");
  link.addEventListener("click", (event) => {
    event.preventDefault();
    try {
      DOMHandler.load(LoginPage);
    } catch (error) {
      console.log(error);
    }
  });
}

const SignUpPage = {
  toString() {
    return render();
  },

  addListeners() {
    listenSubmitForm();
    listenLogin();
  },
};

export default SignUpPage;