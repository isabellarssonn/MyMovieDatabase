import { fetchSearch, fetchTopMovies, fetchSingleMovie } from "./api.js";
import { movieCard, singleMovieInfo } from "../components/movieCard.js";
import { toggleFavorite } from "../utils/utils.js";

// Funktion som får ut sökresultat på skärmen
export async function handleSearchPage() {

    let query = localStorage.getItem("searchQuery"); // Hämta sökning från localStorage
    let sectionRef = document.querySelector("#cardContainer");

    if (query) {
        let searchedMovies = await fetchSearch(query); // Skickar sökordet till API:et
        searchedMovies.forEach(movie => {
            sectionRef.appendChild(movieCard(movie));
        });
    }
}

export async function handleSingleMovie() {
    let movieID = localStorage.getItem("selectedMovieID"); // Hämta ID från localStorage

    if (movieID) {
        let movieData = await fetchSingleMovie(movieID);
        singleMovieInfo(movieData); // Visa filmens info på sidan
    } else {
        console.error("Ingen film vald.");
    }
}

// Funktion som visar favoritfilmer
export async function displayFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let cardContainer = document.getElementById("cardContainer");

    // Rensa innehållet innan nya favoriter läggs till
    cardContainer.innerHTML = "";

    // Hämta alla filmer först
    let allMovies = await fetchTopMovies();
    // Filtrera ut favoritfilmer baserat på sparade movieId:s
    let favoriteMovies = allMovies.filter(movie => favorites.includes(movie.imdbID));
    console.log("Favoritfilmer:", favoriteMovies); 

    // Använd existerande filmkort och lägg in på sidan
    favoriteMovies.forEach(movie => {
        let movieElement = movieCard(movie); 
        cardContainer.appendChild(movieElement);
    });
}

// Hanterar klick på stjärnorna
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("movie__star-btn") || event.target.classList.contains("singlemovie__star-btn")) {
        toggleFavorite(event);
    }
});