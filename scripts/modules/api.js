// API-anrop

export async function fetchTopMovies() {
    return fetch('https://santosnr6.github.io/Data/favoritemovies.json')
    .then(response => response.json())
    .then(data => { return data; }) //Returnerar alla 38 filmer
    .catch(error => console.log(error.message));
}