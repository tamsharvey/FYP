const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=53c1020b3a0e7aeb482d50f68918374e";
const IMGPATH = "https://image.tmdb.org/t/p/w300";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=53c1020b3a0e7aeb482d50f68918374e&query=";


const main = document.getElementById("content");
const form = document.getElementById("movieForm");
const search = document.getElementById("movieName");

// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
        <div class="row">
            <div class="column">
                <img src="${IMGPATH + poster_path}" alt="${title}"/>
            </div>
            <div class="column">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview:</h3>
                    ${overview}
                </div>
            </div>
          </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const movieSearch = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});



// const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=53c1020b3a0e7aeb482d50f68918374e";
// const IMGPATH = "https://image.tmdb.org/t/p/w1280";
// const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=53c1020b3a0e7aeb482d50f68918374e&query=";
//
//
// const main = document.getElementById("content");
// const form = document.getElementById("form");
// const search = document.getElementById("search");
//
// // initially get fav movies
// getMovies(APIURL);
//
// async function getMovies(url) {
//     const resp = await fetch(url);
//     const respData = await resp.json();
//
//     console.log(respData);
//
//     showMovies(respData.results);
// }
//
// function showMovies(movies) {
//     // clear main
//     // main.innerHTML = "SearchHome.html";
//     const existingElement = document.getElementById("content");
//
//     movies.forEach((movie) => {
//         const { poster_path, title, vote_average, overview } = movie;
//
//         const movieEl = document.createElement("div");
//         movieEl.classList.add("movie");
//
//         movieEl.innerHTML = `
//             <img src="${IMGPATH + poster_path}" alt="${title}" />
//             <div class="movie-info">
//                 <h3>${title}</h3>
//                 <span class="${getClassByRate( vote_average )}">${vote_average}</span>
//             </div>
//             <div class="overview">
//                 <h3>Overview:</h3>
//                 ${overview}
//             </div>
//         `;
//
//         existingElement.appendChild(movieEl);
//     });
// }
//
// function getClassByRate(vote) {
//     if (vote >= 8) {
//         return "green";
//     } else if (vote >= 5) {
//         return "orange";
//     } else {
//         return "red";
//     }
// }
//
// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//
//     const searchTerm = search.value;
//
//     if (searchTerm) {
//         getMovies(SEARCHAPI + searchTerm);
//
//         search.value = "";
//     }
// });

// const moviesDiv = document.getElementById("movies")
//
// import { getPopularMovies } from "/apiRequest";
// import { config } from "/movieAPIConfig";
//
// export async function renderMovies() {
//     const movies = await getPopularMovies()
//     console.log(movies)
//     moviesDiv.innerHTML = movies?.map(movie => renderSingleMovie(movie)).join("")
// }
//
// function renderSingleMovie(movie) {
//     return (
//         `
//         <div class="col-4 col-lg-3 col-xl-2 p-1">
//             <img src="${config.image_base_url + movie?.poster_path}" class="img-fluid" >
//         </div>
//         `
//     )
// }