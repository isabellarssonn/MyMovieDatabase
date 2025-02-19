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

export async function shuffledTrailers() {
    try {
        let movies = await fetchTopMovies();
        return shuffleArray(movies); 
    } catch (error) {
        console.error("Gick inte att shuffla trailers:", error);
        return [];
    }
}

// Lägga ihop funktionerna ovan till en??