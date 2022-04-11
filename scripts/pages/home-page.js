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
                ${boardPattern("home")}
                <div class="container-xl__boards">
                  <div class="section"> 
                    <div class="section-sm">
                      <h1 class="heading--md">My Boards</h1>
                      ${indexAllBoards(boards)}
                    </div>
                  </div>
                </div>
              </section>
            </body>`
}

export function boardPattern(namePage) {
  return `<div class="container-xl__sidebar flex flex-column justify-between bg-white">
            <div class="container-xl__top">
              <div class="container-xl__top-logo flex flex-column justify-center">
                <img src="/icons/organizable.svg" class="organizable-size">
              </div>
              <ul class="navbar flex flex-column gap-2">
                ${navbar(namePage, "My Boards", "home", "/icons/board.svg")}
                ${navbar(namePage, "Close Boards", "closeboards", "/icons/closeboard.svg")}
                ${navbar(namePage, "My Profile", "profile", "/icons/username.svg")}
              </ul>
            </div>
            <div class="container-xl__bottom flex items-center">
              <div class="container-xl__bottom-logout flex justify-center items-center gap-1">
                <img src="/icons/logout.svg" class="logout-size">
                <p class="content-sm"><a class="primary-400 js-logout-link" href="#">Log out</a></p>
              </div>
            </div>
          </div>`
}

function navbar(namePage, nameLabel, nameLink, urlIcon) {
  let link = "";
  if (namePage == nameLink) {
    link = `class="navbar__element navbar__element-active gap-1 js-${nameLink}-link"`;
  } else {
    link = `class="navbar__element gap-1 js-${nameLink}-link"`;
  }

  return `<li ${link}>
            <img src=${urlIcon} class="board-size">
            <p class="content-md"><a href="#">${nameLabel}</a></p>
          </li>`
}
  
function indexAllBoards(boards) {
  let indexStarredBoards = "";
  let indexBoards = "";
  for(let board of boards){
    if (board.starred) {
      indexStarredBoards += renderBoards(board.name, "true", "/icons/starredboard.svg");
    }
    if (!board.starred && !board.closed) {
      indexBoards += renderBoards(board.name,"false", "/icons/unstarredboard.svg");
    }
  }
  indexBoards += `<div class="label-name__new">
                    <p class="content-lg">Create Board</p>
                  </div>`;

  return `<div class="boards-starred">
            <h2 class="heading--md heading--sm mb-8">Starred boards</h2>
            <div class="container-label">
              ${indexStarredBoards}
            </div>
          </div>
          <div class="boards-nonstarred">
            <h2 class="heading--md heading--sm mb-8">Boards</h2>
            <div class="container-label">
              ${indexBoards}
            </div>
          </div>` 
}

function renderBoards(nameBoard, dataFavorite, urlIcon) {
  return `<div class="label-name">
            <p class="content-lg">${nameBoard}</p>
            <div class="container-icons">
              <div class="icon"><a><img src="/icons/trash.svg" class="trash-size"></a></div>
              <div class="icon"><a><img data-favorite=${dataFavorite} src=${urlIcon} class="star-size"></a></div>
            </div>
          </div>
          `;
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

function listenAddCloseBoards() {
  const addCloseBoards = document.querySelector(".js-trash");
  addCloseBoards.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      DOMHandler.load(CloseBoardsPage);
    } catch (error) {
      console.log(error);
    }
    // DOMHandler.load(CloseBoardsPage);
  });

}

const HomePage = {
  toString() {
    return render();
  },

  addListeners() {
    listenLogout(),
    listenCloseBoards(),
    listenProfile(),
    listenAddCloseBoards();
  },
};

export default HomePage;