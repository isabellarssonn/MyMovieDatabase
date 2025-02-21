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
