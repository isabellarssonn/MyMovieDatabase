// Shuffle- och hjälpfunktioner

import { fetchTopMovies } from '../modules/api.js'

// Funktion för att blanda en array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, 5);
}

// Hämtar listan med filmer och slumpar med hjälp av shuffleArray
export async function shuffledTrailers() {
    try {
        let movies = await fetchTopMovies();
        return shuffleArray(movies); 
    } catch (error) {
        console.error("Gick inte att shuffla trailers:", error);
        return [];
    }
}

export function toggleFavorite(event) {
    const star = event.target;
    const movieId = star.dataset.movieId;

    if (!movieId) return;

    // Hämtar favoritlistan från LS, konverterar JSON-sträng till JS array
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Kollar om filmen redan finns i favoriter
    if (favorites.includes(movieId)) {
        favorites = favorites.filter(id => id !== movieId);
        star.classList.remove("fa-solid");
        star.classList.add("fa-regular");

        // Kollar om vi är på favoritsidan
        let onFavoritesPage = document.getElementById("favoritesTitle"); 
        // Hittar närmaste filmkort runt den klickade stjärnan, tar sedan bort
        if (onFavoritesPage) {
            let movieCard = star.closest(".movie-card");
            if (movieCard) {
                movieCard.remove();
            }
        }
    // Lägger till i favoiter om den inte finns
    } else {
        favorites.push(movieId);
        star.classList.remove("fa-regular");
        star.classList.add("fa-solid");
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
}
