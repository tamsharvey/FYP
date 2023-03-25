async function GenMovies(genreFilter) {
    const genre = document.getElementById('genreFilter').value;
    const apiKey = '53c1020b3a0e7aeb482d50f68918374e';
    let apiUrl = '';
    if (genre && genre !== '') {
        apiUrl = `https://api.themoviedb.org/3/genre/${genreFilter}/movies?api_key=${apiKey}`;
    } else {
        apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
    }
    const response = await fetch(apiUrl);
    const data = await response.json();
    const movies = data.results;

    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";

    const addedMovies = [];

    while (addedMovies.length < 5 && movies.length > 0) {
        const randomIndex = Math.floor(Math.random() * movies.length);
        const movie = movies.splice(randomIndex, 1)[0];

        const movieTitle = movie.title;
        const moviePoster = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+poster+available";
        const movieOverview = movie.overview;

        if (!movieTitle || !moviePoster || !movieOverview) {
            continue;
        }

        if (addedMovies.includes(movie.id)) {
            continue;
        }

        const movieEl = document.createElement("div");
        movieEl.classList.add("rowB");
        movieEl.innerHTML = `
      <div class="columnA">
        <img src="${moviePoster}" alt="${movieTitle} poster">
      </div>
      <div class="columnB">
        <div class="centered">
          <h3 class="MVtitle">${movieTitle}</h3>
          <div class="des">Description: ${movieOverview}</div>
        </div>
      </div>
    `;

        movieList.appendChild(movieEl);
        addedMovies.push(movie.id);
    }
}


async function GenBooks(subject) {
    const genre = document.getElementById('subject').value;

    let bookApiUrl = '';
    if (genre && genre !== '') {
        bookApiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}`;
    } else {
        alert("Please select a subject.");
        return;
    }
    const response = await fetch(bookApiUrl);
    const data = await response.json();
    const books = data && data.items ? data.items : [];

    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    const addedBooks = [];

    while (addedBooks.length < 5 && books.length > 0) {
        const randomIndex = Math.floor(Math.random() * books.length);
        const book = books.splice(randomIndex, 1)[0];

        // Check if book is already in the list
        if (addedBooks.includes(book.id)) {
            continue;
        }

        const bookTitle = book.volumeInfo.title;
        const bookCover = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/128x196?text=No+cover+available";
        const bookAuthor = book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Unknown";
        const bookDescription = book.volumeInfo.description ? book.volumeInfo.description : "No description available.";

        if (bookTitle.toLowerCase().includes("subject directory") || bookTitle.toLowerCase().includes("manual") || bookTitle.toLowerCase().includes("subject guide") || bookAuthor.toLowerCase().includes("united states. bureau") || bookAuthor.toLowerCase().includes("library of congress")) {
            continue; // skip this book and try again
        }

        const bookEL = document.createElement("div");
        bookEL.classList.add("rowB");
        bookEL.innerHTML = `
      <div class="columnA">
          <img id="bookImg" src="${bookCover}" alt="${bookTitle} cover">
      </div> 
      <div class="columnB">
          <h3 class="title">${bookTitle} By ${bookAuthor}</h3>
          <div class="des">Description: ${bookDescription}</div>
      </div>
    `;

        bookList.appendChild(bookEL);
        addedBooks.push(book.id);
    }
}


function switchGenMovies() {
    window.location.href = "./GenMovies.html";
}

function switchGenBooks() {
    window.location.href = "./GenBooks.html";
}
