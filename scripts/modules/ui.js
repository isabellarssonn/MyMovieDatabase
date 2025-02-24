import { fetchSearch } from "./api.js";
import { movieCard } from "../components/movieCard.js";

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