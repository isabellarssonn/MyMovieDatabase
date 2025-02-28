// Skapa filmkort

// Skapar filmkort i ett HTML element
export function movieCard(movie) {
    let movieElement = document.createElement('div');
    movieElement.classList.add('movie-card');

    if(movie.Poster === 'N/A') {
        movie.Poster = '../res/icons/missing-poster.svg';
      }

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let isFavorite = favorites.includes(movie.imdbID);

    movieElement.innerHTML = 
        `<i class="movie__star-btn fa-${isFavorite ? 'solid' : 'regular'} fa-star" data-movie-id="${movie.imdbID}"></i>
        <img src="${movie.Poster}" alt="Bild av filmen ${movie.Title}" class="movie-card__img">
        <h3 class="movie-card__title">${movie.Title}</h3>`
        ;

        movieElement.querySelector('.movie-card__title').addEventListener('click', () => {
            localStorage.setItem('selectedMovieID', movie.imdbID);
            window.location.href = "movie.html";
        });

    return movieElement;
}


export function singleMovieInfo(singleMovie) {
    let movieInfo = document.querySelector('#movieInformation');

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let isFavorite = favorites.includes(singleMovie.imdbID);

    movieInfo.innerHTML =
        `<article class="singlemovie__container">
        <header class="singlemovie__header">
            <h2 class="singlemovie__title">${singleMovie.Title}</h2>
            <i class="singlemovie__star-btn fa-${isFavorite ? 'solid' : 'regular'} fa-star" data-movie-id="${singleMovie.imdbID}"></i>
        </header>
        <div class="singlemovie__content">
            <img src="${singleMovie.Poster}" alt="Bild av filmen ${singleMovie.Title}" class="singlemovie__img">
                <section class="singlemovie__info">
                <hr class="single-line">
                    <div class="singlemovie__info--first-row">
                        <p class="singlemovie__rated">Rated: ${singleMovie.Rated}</p>
                        <p class="singlemovie__genre">Genre: ${singleMovie.Genre}</p>
                        <p class="singlemovie__runtime">Runtime: ${singleMovie.Runtime}</p>
                        <p class="singlemovie__released">Released: ${singleMovie.Released}</p>
                        <p class="singlemovie__imdbRating">Rating: ${singleMovie.imdbRating}/10</p>
                    </div>
                    <hr class="single-line">
                    <div class="singlemovie__info--second-row">
                        <h3 class="singlemovie__plot-title">Plot</h3>
                        <p class ="singlemovie__plot-text">${singleMovie.Plot}</p>
                    </div>
                    <hr class="single-line">
                    <div class="singlemovie__info--third-row">
                        <div class="singlemovie__info-column">
                            <h3 class="singlemovie__info-title">Director:</h3>
                            <p class="singlemovie__info-text">${singleMovie.Director}</p>
                        </div>
                        <div class="singlemovie__info-column">
                            <h3 class="singlemovie__info-title">Writer:</h3>
                            <p class="singlemovie__info-text">${singleMovie.Writer}</p>
                        </div>
                        <div class="singlemovie__info-column">
                            <h3 class="singlemovie__info-title">Actors:</h3>
                            <p class="singlemovie__info-text">${singleMovie.Actors}</p>
                        </div>
                    </div>
                </section>
            </div>
        </article> `
        ;
    
        return movieInfo;
}