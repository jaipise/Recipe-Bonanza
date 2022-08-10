class NavBar extends HTMLElement {
  constructor() {
    // call constructor of HTMLElement class
    super();
    // nav bar on home page
    if (this.getAttribute('location') == 'home') {
      this.innerHTML = `
            <nav class="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
      <div class="container-fluid">
        <a class="navbar-brand large" href="#" style="font-size: 2rem"
          >Recipe Bonanza 🥗</a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#" style="font-size: 1.5rem"
                >🔎 Recipe Search
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="html/favorites.html"
                style="font-size: 1.5rem"
                >✩ Your Favorites
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="./html/enterRecipe.html"
                style="font-size: 1.5rem"
              >
                ✏️ Enter Your Own Recipe
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="./html/enteredRecipes.html"
                style="font-size: 1.5rem"
                >🗂 Recipes that you have entered
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
          `
    }

    // not in home page
    else if (this.getAttribute('location') == 'html') {
      this.innerHTML = `
            <nav class="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
      <div class="container-fluid">
        <a
          class="navbar-brand large"
          href="../index.html"
          style="font-size: 2rem"
          >Recipe Bonanza 🥗</a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="../index.html" style="font-size: 1.5rem"
                >🔎 Recipe Search
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="./favorites.html"
                style="font-size: 1.5rem"
                >✩ Your Favorites
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="./enterRecipe.html"
                style="font-size: 1.5rem"
              >
                ✏️ Enter Your Own Recipe
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="./enteredRecipes.html"
                style="font-size: 1.5rem"
                >🗂 Recipes that you have entered
              </a>
            </li>
            
            
          </ul>
        </div>
      </div>
    </nav>
          `
    }
  }
}

window.customElements.define('nav-bar', NavBar);