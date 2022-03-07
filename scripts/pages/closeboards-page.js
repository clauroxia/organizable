import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import ProfilePage from "./profile-page.js";
import STORE from "../store.js";
import { boardPattern } from "./home-page.js";

function render() {
  const boards = STORE.boards;
  return `<body class="bg-gray-100">
  <section class="container-xl flex">
  ${boardPattern()}
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