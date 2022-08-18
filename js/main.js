// API TARGET ----------------------------------------------------------------
let defaultUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44`,
  trendingURL =
    "https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
  latestURL =
    "https://api.themoviedb.org/3/movie/latest?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
  popularURL =
    "https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
  topRatedURL =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
  upcomingURL =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44";

// SEALCET DOCUMENTS ----------------------------------------------------------------
let toggleMenu = document.getElementById("toggle"),
  nav = document.getElementById("nav"),
  movie = document.getElementById("movie"),
  nowPlaying = document.getElementById("now-playing"),
  popular = document.getElementById("popular"),
  topRated = document.getElementById("top-rated"),
  trending = document.getElementById("trending"),
  upcoming = document.getElementById("upcoming"),
  searchInput = document.getElementById("search-input");

// OPEN AND CLOSE NAV ----------------------------------------------------------------
toggleMenu.addEventListener("click", () => {
  if (nav.classList.contains("close-nav")) {
    console.log("has");
    nav.classList.remove("close-nav");
    nav.classList.add("open-nav");
  } else {
    nav.classList.remove("open-nav");
    nav.classList.add("close-nav");
  }
});

// GET MOVIES FROM API ----------------------------------------------------------------
async function getMovies(target) {
  let data = await fetch(target);
  let { results } = await data.json();

  function displayMovies() {
    let cartont = "";
    results.map(
      (movie) =>
        (cartont += `
    <div id="movie" class="movie">
        <img src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}"/>
        <div class="layer">
            <div>
                <h3>${movie.original_title}</h3>
                <p>${movie.overview}</p>
                <p>${movie.vote_average}</p>
                <p>${movie.release_date}</p>
            </div>
        </div>
    </div>
    `)
    );

    document.getElementById("display-movies").innerHTML = cartont;
  }
  displayMovies();
}

// SEARCH ABOUT MOVIES FROM OMBD ----------------------------------------------------------------
async function getSearchResults(searchValue) {
  let data = await fetch(
    `https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`
  );

  let { Search } = await data.json();

  function displayMovies() {
    let cartont = "";
    Search?.map(
      (movie) =>
        (cartont += `
      <div id="movie" class="movie">
          <img src="${movie.Poster}"/>
          <div class="layer">
              <div>
                  <h3>${movie.Title}</h3>
                  <p>${movie.Year}</p>
                  <p>${movie.Type}</p>
                  <p>${movie.imdbID}</p>
                 
              </div>
          </div>
      </div>
      `)
    );

    document.getElementById("display-movies").innerHTML = cartont;
  }

  if (Search !== undefined) {
    displayMovies();
  } else {
    getMovies(defaultUrl);
  }
}

// DEFAULT DISPLAY NOW PLAYING MOVIES ----------------------------------------------------------------
getMovies(defaultUrl);

// GET NOW PLAYING MOVIES ----------------------------------------------------------------
nowPlaying.addEventListener("click", () => getMovies(defaultUrl));

// GET POPULAR MOVIES ----------------------------------------------------------------
popular.addEventListener("click", () => getMovies(popularURL));

// GET TOP RATED MOVIES ----------------------------------------------------------------
topRated.addEventListener("click", () => getMovies(topRatedURL));

// GET TRANDING MOVIES ----------------------------------------------------------------
trending.addEventListener("click", () => getMovies(trendingURL));

// GET UPCOMING MOVIES ----------------------------------------------------------------
upcoming.addEventListener("click", () => getMovies(upcomingURL));

// SEARCH ABOUT MOVIES ----------------------------------------------------------------
searchInput.addEventListener("keyup", () => {
  getSearchResults(searchInput.value);
});
