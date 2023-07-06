const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

// load movies from api
async function loadMovies(searchTerm){
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=79a28e2a`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True"){
        // console.log(data.Search);
        displayMovieList(data.Search); 
    }
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    }else{
        searchList.classList.add('hide-search-list');
    }
    // console.log(searchTerm);
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0;idx < movies.length;idx++){

        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID;
        movieListItem.classList.add('search-list-item');
        // movieListItem.onclick = console.log(1);
        // console.log(movieListItem);
        if (movies[idx].Poster != "N/A") {
            moviePoster = movies[idx].Poster;
        }else{
            moviePoster = "img/music-2.png";
        }
        movieListItem.innerHTML = 
        `<div class="search-item-thumbnail">
            <img src=${moviePoster} alt="">
        </div>
        <div class="search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>

        </div>`;
        searchList.appendChild(movieListItem);

    }
    loadMovieOnScreen();
}

async function fetchThenShow(imdbID){
        
    searchList.classList.add('hide-search-list');
    movieSearchBox.value = "";

    // const imdbID = movie.dataset.id;

    const result = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=79a28e2a`);
    const movieDetails = await result.json();
    
    displayMovieDetails(movieDetails);


}

function init_call(){
    const imdbID = sessionStorage.getItem("movie_id");
    if(imdbID == 'undefined'){

        resultGrid.innerHTML = `
        <div class="movie-poster">
            <img src="${"img/image_not_found.png"}" alt="">
        </div>
        <div class="movie-info">
            <h3 class="movie-title">N/A</h3>
            <ul class="movie-misc-info">
                <li class="year">Year: N/A</li>
                <li class="rated">Rating: N/A</li>
                <li class="released">Released:N/A</li>
            </ul>
            <p class="genre"><b>Genre:</b>N/A</p>
            <p class="writer"><b>Writer:</b>N/A</p>
            <p class="actors"><b>Actors:</b>N/A</p>
            <p class="plot"><b>Plot:</b>N/A</p>
            <p class="language"><b>Language:</b>N/A</p>
            <p class="awards"><b><i class="fas fa-award"></i></b>N/A</p>
        </div>
    `;

    }else{
        fetchThenShow(imdbID);
    }
}

init_call();


function loadMovieOnScreen(){
    
    const searchListItem = document.querySelectorAll(".search-list-item");

    searchListItem.forEach(movie=>{
        movie.addEventListener('click',async()=>{
        
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";

            const imdbID = movie.dataset.id;

            const result = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=79a28e2a`);
            const movieDetails = await result.json();
            
            displayMovieDetails(movieDetails);


    
    
        })
    })
    
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
        <div class="movie-poster">
            <img src="${(details.Poster != "N/A")?details.Poster : "img/image_NA.png"}" alt="">
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${details.Title}</h3>
            <ul class="movie-misc-info">
                <li class="year">Year: ${details.Year}</li>
                <li class="rated">Rating: ${details.Rated}</li>
                <li class="released">Released:${details.Released}</li>
            </ul>
            <p class="genre"><b>Genre:</b>${details.Genre}</p>
            <p class="writer"><b>Writer:</b>${details.Writer}</p>
            <p class="actors"><b>Actors:</b>${details.Actors}</p>
            <p class="plot"><b>Plot:</b>${details.Plot}</p>
            <p class="language"><b>Language:</b>${details.Language}</p>
            <p class="awards"><b><i class="fas fa-award"></i></b>${details.Awards}</p>
        </div>
    `;
}

document.querySelector(".go-to-home").addEventListener("click",(e)=>{
    
    document.location.href = './index.html';
    
    // console.log(e);
})

// loadMovies('batman');