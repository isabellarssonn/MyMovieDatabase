// Huvudflödet

// Alla imports här uppe

import { fetchTopMovies } from './modules/api.js'
import { shuffledTrailers } from "./utils/utils.js";
import { renderTrailers } from './modules/carousel.js';
import { movieCard } from './components/movieCard.js';

// console.log(await fetchTopMovies());

if(window.location.pathname === '/' || window.location.pathname === '/index.html') {
    console.log('index.html');

} else if(window.location.pathname === '/favorites.html') {
    console.log('favorites.html');

} else if(window.location.pathname === '/movie.html') {
    console.log('movie.html');

} else if(window.location.pathname === '/search.html') {
    console.log('search.html');

}


pageSetup();

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
}