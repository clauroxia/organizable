function render() {
  return `<body class="bg-gray-100">
  <section class="section-lg">
    <div class="container flex flex-column gap-8 items-center">
      <img src="/icons/organizable.svg" alt="rankable logo" />
      <h1 class="heading">Login</h1>
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
          <span class="input__error-message">Error message</span>
        </div>
        <div class="input">
          <label for="input-2" class="content-xs overline">Password</label>
          <div class="input__container">
            <img
              src="/icons/password.svg"
              alt="user-icon"
              class="input__icon"
            />
            <input
              type="password"
              placeholder="******"
              class="input__content"
              id="input-2"
              name="input-2"
              required
            />
          </div>
          <span class="input__error-message">Error message</span>
        </div>
        <button type="submit" class="button button--secondary width-full">
          Login
        </button>
      </form>
      <a href="#">Create Account</a>
    </div>
  </section>
</body>`
}


const LoginPage = {
  toString() {
    return render();
  },
  addListeners() {

  }

}

export default LoginPage;