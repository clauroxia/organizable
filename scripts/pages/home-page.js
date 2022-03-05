import DOMHandler from "../dom-handler.js";
import LoginPage from "./login-page.js";
import { logout } from "../services/session-service.js";
import CloseBoardsPage from "./closeboards-page.js";
import ProfilePage from "./profile-page.js";
import STORE from "../store.js";

function render() {
  const boards = STORE.boards;
  return `<body>
  <section class="container-xl flex">
    <div class="container-xl__sidebar flex flex-column justify-between bg-white">
      <div class="container-xl__top">
        <div class="container-xl__top-logo flex flex-column justify-center">
          <img src="/icons/organizable.svg" class="organizable-size">
        </div>
        <ul class="navbar flex flex-column gap-2">
          <li class="navbar__element navbar__element-active flex items-center justify-content gap-1">
            <img src="/icons/board.svg" class="board-size">
            <p class="content-md"><a href="#">My Boards</a></p>
          </li>
          <li class="navbar__element flex items-center justify-content gap-1 js-closeboards-link">
            <img src="/icons/closeboard.svg" class="closeboard-size">
            <p class="content-md"><a href="#">Close Boards</a></p>
          </li>
          <li class="navbar__element flex items-center justify-content gap-1 js-profile-link">
            <img src="/icons/username.svg" class="username-size">
            <p class="content-md"><a href="#">My Profile</a></p>
          </li>
        </ul>
      </div>
      <div class="container-xl__bottom flex items-center">
        <div class="container-xl__bottom-logout flex justify-center items-center gap-1">
          <img src="/icons/logout.svg" class="logout-size">
          <p class="content-sm"><a class="primary-400 js-logout-link" href="#">Log out</a></p>
        </div>
      </div>
    </div>
    <div class="container-xl__boards">
      <div class="section"> 
        <div class="section-sm">
          <h1 class="heading--md">My Boards</h1>
          <div class="boards-starred">
            <h2 class="heading--md heading--sm">Starred boards</h2>
            ${indexStarredBoards(boards)}
          </div>
          <div class="boards-nonstarred">
            <h2 class="heading--md heading--sm">Boards</h2>
            ${indexBoards(boards)}
          </div>
        </div>
      </div>
    </div>
  </section>
</body>
`
}

function indexStarredBoards(boards) {
  let index = "";
  for(let board of boards){
    if (board.starred) index += `<p>${board.name}</p>`;
  }
  return index;
}

function indexBoards(boards) {
  let index = "";
  for(let board of boards){
    if (!board.starred && !board.closed) index += `<p>${board.name}</p>`;
  }
  return index;
}

function listenCloseBoards() {
  const link = document.querySelector(".js-closeboards-link");
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    DOMHandler.load(CloseBoardsPage);
  });
}

function listenProfile() {
  const link = document.querySelector(".js-profile-link");
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    DOMHandler.load(ProfilePage);
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


const HomePage = {
  toString() {
    return render();
  },

  addListeners() {
    listenLogout(),
    listenCloseBoards(),
    listenProfile();
  },
};

export default HomePage;