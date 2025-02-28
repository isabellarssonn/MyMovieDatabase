// Huvudflödet

// Alla imports här uppe

import { fetchTopMovies } from './modules/api.js'
import { shuffledTrailers } from "./utils/utils.js";
import { renderTrailers } from './modules/carousel.js';
import { movieCard } from './components/movieCard.js';
import { handleSearchPage, handleSingleMovie, displayFavorites } from './modules/ui.js';


if(window.location.pathname === '/' || window.location.pathname === '/index.html') {
    console.log('index.html');
    pageSetup();

} else if(window.location.pathname === '/favorites.html') {
    console.log('favorites.html');
    displayFavorites();

} else if(window.location.pathname === '/movie.html') {
    console.log('movie.html');
    handleSingleMovie();

} else if(window.location.pathname === '/search.html') {
    console.log('search.html');
    handleSearchPage();
}



async function pageSetup() {

    // Hämtar och visar slumpade trailers
    let movies = await shuffledTrailers();

    document.querySelector('.trailers__container').innerHTML = ""; 

    movies.forEach((movie, index) => {
        renderTrailers(movie, index + 1);
    });

    // Hämtar filmer, slicear 20, lägger till filmkort i HTML element
    let allMovies = await fetchTopMovies(); // Hämtar alla filmer
    let highRankMovies = allMovies.slice(0, 20)  
    let sectionRef = document.querySelector('#cardContainer');
    for(let movie of highRankMovies) {
        sectionRef.appendChild(movieCard(movie))
    }
    
    // Hanterar sökfunktion, eventlyssnare på searchForm
    let searchForm = document.getElementById('searchForm');
    let searchInput = document.getElementById('searchInput');

        searchForm.addEventListener('submit', (event) => {
            event.preventDefault()
            
            const search = searchInput.value.trim(); // Hämtar användarens sökning
            if (search) {
                localStorage.setItem("searchQuery", search); // Sparar sökning i localStorage
                window.location.href = `search.html?query=${encodeURIComponent(search)}`;
            }
        });
    }