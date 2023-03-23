const IMGPATH = "https://image.tmdb.org/t/p/w300";

function searchMovies(searchTerm, mediaType) {
    const searchT = document.getElementById('searchTerm').value;
    const media = document.getElementById('mediaType').value;
    const movieApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=53c1020b3a0e7aeb482d50f68918374e&language=en&query=${searchT}`;
    const bookApiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchT}`;

    const db = firebase.firestore();

    console.log(searchT);
    console.log(media);

    // Get reference to searchResults div
    const searchResultsDiv = document.querySelector('.searchResults');

    if (media === "movie_tvshow" || media === "both") {
        fetch(movieApiUrl)
            .then(response => response.json())
            .then(data => {

                const movies = data.results;

                // Clear previous search results
                searchResultsDiv.innerHTML = "";

                // Loop through movies and create HTML elements for each movie
                movies.forEach(movie => {
                    const {poster_path, title,release_date, overview} = movie;

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

                    const releaseDateEl = document.createElement('p');
                    releaseDateEl.textContent = `Release Date: ${release_date}`;

                    movieInfoEl.appendChild(releaseDateEl);
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
    else if (media === "book" || media === "both") {
        fetch(bookApiUrl)
            .then(response => response.json())
            .then(data => {

                const books = data.items;

                // Clear previous search results
                searchResultsDiv.innerHTML = "";

                // Loop through books and create HTML elements for each book
                books.forEach(book => {
                    const {volumeInfo: {imageLinks, title, averageRating, description}} = book;

                    const bookEl = document.createElement('div');
                    bookEl.classList.add('book');

                    const coverEl = document.createElement('img');
                    coverEl.src = imageLinks.thumbnail;
                    coverEl.alt = title;
                    bookEl.appendChild(coverEl);

                    const bookInfoEl = document.createElement('div');
                    bookInfoEl.classList.add('book-info');

                    const titleEl = document.createElement('h3');
                    titleEl.textContent = title;
                    bookInfoEl.appendChild(titleEl);

                    bookEl.appendChild(bookInfoEl);

                    const descriptionEl = document.createElement('div');
                    descriptionEl.classList.add('description');

                    const descriptionHeaderEl = document.createElement('h3');
                    descriptionHeaderEl.textContent = 'Description:';
                    descriptionEl.appendChild(descriptionHeaderEl);

                    const descriptionTextEl = document.createElement('p');
                    descriptionTextEl.textContent = description;
                    descriptionEl.appendChild(descriptionTextEl);

                    bookEl.appendChild(descriptionEl);

                    // Append bookEl to searchResultsDiv
                    searchResultsDiv.appendChild(bookEl);

                    // Add book to Firestore database
                    db.collection("Books").add({
                        title: title,
                        authors: book.volumeInfo.authors,
                        publishedDate: book.volumeInfo.publishedDate,
                        description: description,
                        thumbnailUrl: imageLinks.thumbnail
                    })
                        .then(docRef => {
                            console.log("Book added with ID: ", docRef.id);
                        })
                        .catch(error => {
                            console.error("Error adding book: ", error);
                        });
                });

            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage, errorCode);
            });
    }
}
