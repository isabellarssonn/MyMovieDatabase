// Skapa filmkort

// Skapar filmkort i ett HTML element
export function movieCard(movie) {
    let movieElement = document.createElement('div');
    movieElement.classList.add('movie-card');

    movieElement.innerHTML = 
        `<i class="movie__star-btn fa-regular fa-star"></i>
        <img src="${movie.Poster}" alt="Bild av filmen ${movie.Title}" class="movie-card__img">
        <h3 class="movie-card__title">${movie.Title}</h3>`
        ;

    return movieElement;
}
