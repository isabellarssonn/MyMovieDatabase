// Huvudflödet

// Alla imports här uppe

import { fetchTopMovies } from './modules/api.js'
import { shuffledTrailers } from "./utils/utils.js";
import { renderTrailers } from './modules/carousel.js';

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
    let allMovies = await fetchTopMovies(); // Hämtar alla filmer
    let movies = await shuffledTrailers(); // Hämtar slumpade filmer

    document.querySelector('.trailers__container').innerHTML = ""; 

    movies.forEach((movie, index) => {
        renderTrailers(movie, index + 1);
    });
}