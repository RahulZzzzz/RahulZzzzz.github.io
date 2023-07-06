// most popular movie
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

//searched movie
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const movieBox = document.getElementById("movie-box");
const movieSearchBox = document.getElementById("movie-search-box");


// load movies from api
async function loadMovies(searchTerm,box){
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=79a28e2a`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True"){
        // console.log(data.Search);
        box.dataset.id = data.Search[0].imdbID;
    }
}

// ${(details.Poster != "N/A")?details.Poster : "img/image_NA.png"}

const showMovies = (data)=>{
    movieBox.innerHTML = "";
    data.forEach(
        (item) => {
            // console.log(item);
            const box = document.createElement("div");
            loadMovies(item.original_title,box);
            box.classList.add("box");
            box.innerHTML = `
            <img src="${(item.poster_path) ? (IMGPATH + item.poster_path) : "../img/image_NA1.5.png"}" alt=""/>
            <div class="title">
                <h3>${item.original_title}</h3>
            </div>
            <div class="overlay">
                <div class="title">
                    <h2>${item.original_title}</h2>
                    <span> ${item.vote_average} </span>
                </div>
                <h3>Overview:</h3>
                <p>
                    ${item.overview}
                </p>
            </div>
            `;
            // console.log(IMGPATH + item.poster_path);
            movieBox.appendChild(box);

            

        }
    )
    loadMovieOnScreen();
}

function loadMovieOnScreen(){
    
    const searchListItem = document.querySelectorAll(".box");

    searchListItem.forEach(movie=>{
        movie.addEventListener('click',
            ()=>{

                movieSearchBox.value = "";
                const url = './movie.html';
                sessionStorage.clear();
                sessionStorage.setItem("movie_id",movie.dataset.id);
                document.location.href = url;

            }
        )
    })
    
}

const getMovies = async(api)=>{
    const response = await fetch(api);
    const data = await response.json();
    console.log(data);
    showMovies(data.results);
}

//init call
getMovies(APIURL);

document.querySelector("#movie-search-box").addEventListener(
    "keyup",
    function(event){
        // console.log(event.target.value);
        if(event.target.value != ""){
            getMovies(SEARCHAPI + event.target.value);
        }else{
            getMovies(APIURL);
        }
    }
)

document.querySelector(".go-to-home").addEventListener("click",(e)=>{
    getMovies(APIURL);
})
