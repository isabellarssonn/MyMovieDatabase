import { fetchSearch, fetchSingleMovie } from "./api.js";
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


// Hämtar vald films ID och data, visar informationen på sidan
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
    
    console.log("Favoritfilmer att visa från LS:", favorites);

    let favoriteMovies = [];

    // Hämta alla favoritfilmer individuellt
    for (let movieId of favorites) {
        try {
            let movieData = await fetchSingleMovie(movieId); 

            if (movieData) {
                favoriteMovies.push(movieData);
            } else {
                console.log(`Filmen med ID ${movieId} kunde inte hämtas.`);
            }
        } catch (error) {
            console.error(`Fel vid hämtning av film ${movieId}:`, error);
        }
    }

    // Rensa innehållet innan nya favoriter läggs till
    let cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = ""; 

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