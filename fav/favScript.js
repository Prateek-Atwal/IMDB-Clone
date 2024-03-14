const resultContainer = document.querySelector(".result-container");

let favMovies = JSON.parse(localStorage.getItem("favMovies"));

favMovies.forEach((id) => {
          getData(id); 
});
async function getData(movieID) {
          console.log(movieID);
          const result = await fetch(
                    `http://www.omdbapi.com/?i=${movieID}&apikey=aa142ca7`
          ); 
          const movieDetails = await result.json(); 

          AddMovie(movieDetails);
}
const AddMovie = (details) => {
          const child = document.createElement("div");

          child.setAttribute("id", details.imdbID); 
          child.setAttribute("class", "result-grid");
          child.innerHTML = `<div class="movie-poster">
        <img src="${
                  details.Poster != "N/A" ? details.Poster : "../notFound.png"
        }" alt="movie-poster">
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${details.Title}</h3>
            <ul class="movie-misc-info">
                <li class="year">Year: ${details.Year}</li>
                <li class="rated">Ratings: ${details.Rated}</li>
                <li class="released">Released: ${details.Released}</li>
            </ul>

            <p class="genre"><b>Genre: </b>${details.Genre}</p>
            <p class="writer"><b>Writer: </b> ${details.Writer}</p>
            <p class="actors"><b>Actors: </b> ${details.Actors}</p>
            <p class="plot"><b>Plot: </b> ${details.Plot}</p>
            <p class="language"><b>Language: </b> ${details.Language}</p>
            <p class="awards"><b>Awards: <i class="fa-solid fa-award"></i></b> ${
                      details.Awards
            }</p>
        </div> 
        `;
          const btn = document.createElement("button");
          btn.setAttribute("class", "delete-btn"); 
          btn.innerHTML = `<i data-id="${details.imdbID}" class="fa-solid fa-trash">`; 
          btn.addEventListener("click", deleteMovie); 
          child.appendChild(btn); 
          resultContainer.appendChild(child);
};
const deleteMovie = (e) => {
          const delID = e.target.dataset.id;
          const movie = document.getElementById(`${delID}`);
          movie.remove();
          favMovies = favMovies.filter((id) => id != delID);
          localStorage.setItem("favMovies", JSON.stringify(favMovies));
};