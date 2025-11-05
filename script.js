const searchInput = document.getElementById("movie_input");
const movieListEl = document.querySelector('.movie_list');
const movieTitleSearch = document.querySelector('.movie_header');
const toggleFilter = document.getElementById("filter_checkbox");
const filterInput = document.getElementById("filter_input");
const yearChange = document.getElementById("year");
var filterStatus = false;

let allMovies = [];

async function renderMovies() {
    document.body.classList += ' display_progress';
    const movies = await fetch(`https://www.omdbapi.com/?s=${searchInput.value}&apikey=59430427`);
    const moviesData = await movies.json();

    if (moviesData.Search) {
        movieTitleSearch.innerHTML = `<h2 class="movie_header">Search results for<br><span class="movie_title-search">"${searchInput.value}"</span></h2>`
        allMovies = moviesData.Search;

        const filteredMovies = filterMoviesByYear(allMovies, filterInput.value, filterStatus);

        displayMovies(filteredMovies.slice(0, 6));
    } else {
        movieListEl.innerHTML = "<h2>No movies found.</h2>";
        document.body.classList.remove('display_progress');
    }
}

function activeFilter() {
    filterStatus = !filterStatus;
    renderMovies();
}

function filterChange() {
    yearChange.innerHTML = filterInput.value;
    renderMovies();
}

function filterMoviesByYear(movies, selectedYear, filterActive) {
    if (filterActive) {
        return movies.filter(movie => movie.Year.includes(selectedYear));
    } else {
        return movies;
    }
}

function displayMovies(movies) {
    setTimeout(() => {
        movieListEl.innerHTML = movies.map((movie) =>
            `<div class="movie_card">
            <figure class="movie_poster-wrapper">
                <img src="${movie.Poster}" alt="${movie.Title} Poster" class="movie_poster">
            </figure>
                <div class="movie_description">
                    <h3 class="movie_name"><b>${movie.Title}</b></h3>
                    <p class="movie_year"><b>${movie.Year}</b></p>
                </div>
            </div>`
        ).join("");
        document.body.classList.remove('display_progress');
    }, 1000);
}