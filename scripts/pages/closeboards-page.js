import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import ProfilePage from "./profile-page.js";
import STORE from "../store.js";
import { boardPattern } from "./home-page.js";
import { logout } from "../services/session-service.js";
import LoginPage from "./login-page.js";


function render() {
  const boards = STORE.boards;
  return `<body class="bg-gray-100">
  <section class="container-xl flex">
  ${boardPattern("closeboards")}
    <div class="container-xl__boards">
      <div class="section section__close-boards"> 
        <div class="section-sm">
          <h2 class="heading--md mb-8">Closed Boards</h2>
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
    if (board.closed) index += `<div class="label-name">
                                  <p class="content-lg">${board.name}</p>
                                  <div class="container-icons">
                                    <div class="icon"><a><img src="/icons/recover.svg" class="recover-size"></a></div>
                                    <div class="icon"><a><img src="/icons/trash.svg" class="trash-size"></a></div>
                                  </div>
                                </div>
                                `;
  }
  return `<div class="container-label">${index}</div>`
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

const CloseBoardsPage = {
  toString() {
    return render();
  },

  addListeners() {
    listenHome(),
    listenProfile(),
    listenLogout();
  },
};

export default CloseBoardsPage;