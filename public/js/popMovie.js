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

    const rw = document.createElement("div");
    rw.classList.add("row");

    movies.forEach((movie) => {
        const {poster_path, title, vote_average, overview} = movie;

        const col = document.createElement("div");
        col.classList.add("column");

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        col.appendChild(movieEl);

        const buttonEL = document.createElement("div");
        buttonEL.classList.add("button-container");

        const addToMyListButton = document.createElement("button");
        addToMyListButton.classList.add("addToMyListButton");
        addToMyListButton.textContent = "Add to List";

        buttonEL.appendChild(addToMyListButton);
        col.appendChild(movieEl);
        col.appendChild(buttonEL);


        movieEl.innerHTML = `
    <div class="rowM">
        <div class="columnM">
            <img src="${IMGPATH + poster_path}" alt="${title}"/>
        </div>
        <div class="columnM">
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

        rw.appendChild(col);

        const addButton = buttonEL.querySelector(".addToMyListButton");
        addButton.addEventListener("click", () => {
            // Create a new object with the book data
            const movieDate = {
                title: movie.title,
                author: movie.author,
                description: movie.description,
                img: poster_path
            }

            addToList(movieDate);
        })
        // col.appendChild(movieEl); // Append movieEl to col
        // rw.appendChild(col); // Append col to rw

        main.appendChild(rw); // Append rw to main
    })
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