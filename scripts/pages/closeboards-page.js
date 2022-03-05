import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import ProfilePage from "./profile-page.js";
import STORE from "../store.js";

function render() {
  const boards = STORE.boards;
  return `<body class="bg-gray-100">
  <section class="container-xl flex">
    <div class="container-xl__sidebar flex flex-column justify-between bg-white">
      <div class="container-xl__top">
        <div class="container-xl__top-logo flex flex-column justify-center">
          <img src="/icons/organizable.svg" class="organizable-size">
        </div>
        <ul class="navbar flex flex-column gap-2">
          <li class="navbar__element flex items-center justify-content gap-1 js-home-link">
            <img src="/icons/board.svg" class="board-size">
            <p class="content-md"><a href="#">My Boards</a></p>
          </li>
          <li class="navbar__element flex items-center justify-content gap-1">
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
          <p class="content-sm primary-400"><a href="#">Log out</a></p>
        </div>
      </div>
    </div>
    <div class="container-xl__boards">
      <div class="section section__close-boards"> 
        <div class="section-sm">
          <h2 class="heading--md">Closed Boards</h2>
          ${closeboards(boards)}
        </div>
      </div>
    </div>
  </section>
</body>
`
}

function closeboards(boards) {
  let index = "";
  for(let board of boards){
    if (board.closed) index += `<p>${board.name}</p>`;
  }
  return index;
}

function listenHome() {
  const link = document.querySelector(".js-home-link");
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    DOMHandler.load(HomePage);
  });
}

function listenProfile() {
  const link = document.querySelector(".js-profile-link");
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    DOMHandler.load(ProfilePage);
  });
}

const CloseBoardsPage = {
  toString() {
    return render();
  },

  addListeners() {
    listenHome(),
    listenProfile();
  },
};

export default CloseBoardsPage;