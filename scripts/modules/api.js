// API-anrop

export async function fetchTopMovies() {
    try {
        let response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Misslyckades att hämta filmer:", error);
        return []; // Returnerar en tom array vid fel
    }
}


export async function fetchSearch(query) {
    try {
        let response = await fetch(`http://www.omdbapi.com/?apikey=36d396b2&s=${query}*`);
        let data = await response.json();
        
        if (data.Search) {
            return data.Search; // Returnerar en array med filmresultaten
        } else {
            return []; // Returnera en tom array om inget hittas
        }
    } catch (error) {
        console.error("Misslyckades att hämta sökresultat:", error);
        return [];
    }
}


export async function fetchSingleMovie(imdbID) {
    try {
        let response = await fetch(`http://www.omdbapi.com/?apikey=36d396b2&plot=full&i=${imdbID}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Misslyckades att hämta filmdetaljer:", error)
    }
}