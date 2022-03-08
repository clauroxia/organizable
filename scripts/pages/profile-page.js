import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import LoginPage from "./login-page.js";
import CloseBoardsPage from "./closeboards-page.js";
import { input } from "../components/inputs.js";
import STORE from "../store.js";
import { updateUser, deleteUser } from "../services/users-service.js";
import { getBoards } from "../services/boards-service.js";
import { boardPattern } from "./home-page.js";
import { logout } from "../services/session-service.js";


function render() {
  const user = STORE.user;
  return `<body>
  <section class="container-xl flex">
    ${boardPattern("profile")}
    <div class="container-xl__boards">
      <div class="section section__close-profile"> 
        <div class="section-sm">
          <h2 class="heading--md mb-8">My Profile</h2>
          <form action="" class="full-width container-sm flex flex-column gap-4 js-update">
          ${input({
            value: user.username,
            label: "Username",
            id: "username",
            placeholder: "username",
            icon: "/icons/username.svg",
            required: true,
          })}
          ${input({
            value: user.email,
            label: "Email",
            id: "email",
            placeholder: "email",
            icon: "/icons/email.svg",
            required: true,
          })}
          ${input({
            value: user.firstName,
            label: "First Name",
            id: "first_name",
            placeholder: "first name",
            icon: "/icons/name.svg",
            required: true,
          })}
          ${input({
            value: user.lastName,
            label: "Last Name",
            id: "last_name",
            placeholder: "last name",
            icon: "/icons/name.svg",
            required: true,
          })}
           
            <button type="submit" class="button button--primary width-full">
              Update Profile
            </button>
            <button type="submit" class="button button--secondary width-full js-delete">
              Delete my Account
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</body>
  `
}

function listenUpdateForm() {
  const form = document.querySelector(".js-update");
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { username, email, first_name, last_name } = event.target;
      const credentials = {
        username: username.value,
        email: email.value,
        first_name: first_name.value,
        last_name: last_name.value,
      };
      STORE.user = await updateUser(STORE.user.id, credentials);
      STORE.boards = await getBoards();
      // console.log(STORE.user);
      DOMHandler.reload();

    } catch (error) {
      DOMHandler.reload();
    }
  });
}

function listenDeleteAccount() {
  const deleteButton = document.querySelector(".js-delete");
  deleteButton.addEventListener("click", async (event) => {
    await deleteUser(STORE.user.id);
    alert("User deleted");
    DOMHandler.load(LoginPage);
  });
}

function listenHome() {
  const link = document.querySelector(".js-home-link");
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    DOMHandler.load(HomePage);
  });
}

function listenCloseBoards() {
  const link = document.querySelector(".js-closeboards-link");
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    DOMHandler.load(CloseBoardsPage);
  });
}

function listenLogout() {
  const link = document.querySelector(".js-logout-link");
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      await logout();
      DOMHandler.load(LoginPage);
    } catch (error) {
      console.log(error);
    }
  });
}

const ProfilePage = {
  toString() {
    return render();
  },

  addListeners() {
    listenUpdateForm(),
    listenDeleteAccount(),
    listenHome(),
    listenCloseBoards(),
    listenLogout();
  },
};

export default ProfilePage;