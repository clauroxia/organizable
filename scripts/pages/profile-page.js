import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import CloseBoardsPage from "./closeboards-page.js";

function render() {
  return `<body>
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
          <li class="navbar__element flex items-center justify-content gap-1 js-closeboards-link">
            <img src="/icons/closeboard.svg" class="closeboard-size">
            <p class="content-md"><a href="#">Close Boards</a></p>
          </li>
          <li class="navbar__element navbar__element-active flex items-center justify-content gap-1">
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
      <div class="section section__close-profile"> 
        <div class="section-sm">
          <h2 class="heading--md mb-8">My Profile</h2>
          <form action="" class="full-width container-sm flex flex-column gap-4">
            <div class="input">
              <label for="input-1" class="content-xs overline">Username</label>
              <div class="input__container">
                <img
                  src="/icons/username.svg"
                  alt="user-icon"
                  class="input__icon"
                />
                <input
                  type="text"
                  placeholder="username"
                  class="input__content"
                  id="input-1"
                  name="input-1"
                  required
                />
              </div>
            </div>
            <div class="input">
              <label for="input-1" class="content-xs overline">Email</label>
              <div class="input__container">
                <img
                  src="/icons/email.svg"
                  alt="user-icon"
                  class="input__icon"
                />
                <input
                  type="text"
                  placeholder="email"
                  class="input__content"
                  id="input-1"
                  name="input-1"
                  required
                />
              </div>
            </div>
            <div class="input">
              <label for="input-1" class="content-xs overline">First Name</label>
              <div class="input__container">
                <img
                  src="/icons/name.svg"
                  alt="user-icon"
                  class="input__icon"
                />
                <input
                  type="text"
                  placeholder="first name"
                  class="input__content"
                  id="input-1"
                  name="input-1"
                  required
                />
              </div>
            </div>
            <div class="input">
              <label for="input-1" class="content-xs overline">Last Name</label>
              <div class="input__container">
                <img
                  src="/icons/name.svg"
                  alt="user-icon"
                  class="input__icon"
                />
                <input
                  type="text"
                  placeholder="last name"
                  class="input__content"
                  id="input-1"
                  name="input-1"
                  required
                />
              </div>
            </div>
            <button type="submit" class="button button--primary width-full">
              Update Profile
            </button>
            <button type="submit" class="button button--secondary width-full">
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



const ProfilePage = {
  toString() {
    return render();
  },

  addListeners() {
    listenHome(),
    listenCloseBoards();
  },
};

export default ProfilePage;