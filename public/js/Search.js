const IMGPATH = "https://image.tmdb.org/t/p/w300";

function searchMovies(searchTerm) {
    const searchT = document.getElementById('searchTerm').value;
    const movieApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=53c1020b3a0e7aeb482d50f68918374e&language=en&query=${searchT}`;

    const db = firebase.firestore();

    // Get reference to searchResults div
    const searchResultsDiv = document.querySelector('.searchResults');

    fetch(movieApiUrl)
        .then(response => response.json())
        .then(data => {

            const movies = data.results;

            // Clear previous search results
            searchResultsDiv.innerHTML = "";

            // Loop through movies and create HTML elements for each movie
            movies.forEach(movie => {
                const { poster_path, title, vote_average, overview } = movie;

                const movieEl = document.createElement('div');
                movieEl.classList.add('movie');

                const posterEl = document.createElement('img');
                posterEl.src = IMGPATH + poster_path;
                posterEl.alt = title;
                movieEl.appendChild(posterEl);

                const movieInfoEl = document.createElement('div');
                movieInfoEl.classList.add('movie-info');

                const titleEl = document.createElement('h3');
                titleEl.textContent = title;
                movieInfoEl.appendChild(titleEl);

                movieEl.appendChild(movieInfoEl);

                const overviewEl = document.createElement('div');
                overviewEl.classList.add('overview');

                const overviewHeaderEl = document.createElement('h3');
                overviewHeaderEl.textContent = 'Overview:';
                overviewEl.appendChild(overviewHeaderEl);

                const overviewTextEl = document.createElement('p');
                overviewTextEl.textContent = overview;
                overviewEl.appendChild(overviewTextEl);

                movieEl.appendChild(overviewEl);

                // Append movieEl to searchResultsDiv
                searchResultsDiv.appendChild(movieEl);

                // Add movie to Firestore database
                db.collection("Movies").add({
                    title: movie.title,
                    release_date: movie.release_date,
                    poster_path: movie.poster_path,
                    overview: movie.overview
                })
                    .then(docRef => {
                        console.log("Movie added with ID: ", docRef.id);
                    })
                    .catch(error => {
                        console.error("Error adding movie: ", error);
                    });
            });

        })
        .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage, errorCode);
        });
}
