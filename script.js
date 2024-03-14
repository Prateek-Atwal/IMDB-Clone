const searchBox = document.querySelector("#movie-search-box");
const searchList = document.querySelector("#search-list");
const resultGrid = document.querySelector("#result-grid"); 

if (!localStorage.getItem("favMovies")) {
          let favMovies = [];
          localStorage.setItem("favMovies", JSON.stringify(favMovies));
}
const findMovies = () => {
          let searchTerm = searchBox.value.trim();

          if (searchTerm.length > 0) {
                    searchList.classList.remove("hide-search-list");
                    fetchMovies(searchTerm);
          } else {
                    searchList.classList.add("hide-search-list");
          }
};
async function fetchMovies(searchTerm) {
          const URL = `http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=aa142ca7`;

          const res = await fetch(`${URL}`);

          const data = await res.json();

          if (data.Response == "True") {
                    displayMoviesList(data.Search);
          }
}
const displayMoviesList = (movies) => {
          searchList.innerHTML = "";
          for (let i = 0; i < movies.length; i++) {
                    let movieListItem = document.createElement("div");
                    movieListItem.dataset.id = movies[i].imdbID;
                    movieListItem.classList.add("search-list-item");
                    if (movies[i].Poster != "N/A") {
                              moviePoster = movies[i].Poster;
                    } else {
                              moviePoster = "notFound.png";
                    }
                    movieListItem.innerHTML = `
        <div class="search-item-thumbnail"> 
            <img src="${moviePoster}" alt="movie">
        </div>

        <div class="search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
        </div>
        `;
                    searchList.appendChild(movieListItem);
          }
          loadMovieDetails();
};
const loadMovieDetails = () => {
          const searchListMovies =
                    searchList.querySelectorAll(".search-list-item");
          searchListMovies.forEach((movie) => {
                    movie.addEventListener("click", async () => {
                              searchList.classList.add("hide-search-list");
                              searchBox.value = "";

                              localStorage.setItem("movieID", movie.dataset.id);

                              window.location.href =
                                        "./moviepage/moviePage.html"; 
                    });
          });
};
window.addEventListener("click", function (e) {
          if (e.target.className != "form-control") {
                    searchList.classList.add("hide-search-list");
          }
});
searchBox.addEventListener("keyup", findMovies);
searchBox.addEventListener("click", findMovies);