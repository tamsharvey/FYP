async function GenMovies(genreFilter) {
    // const IMGPATH = "https://image.tmdb.org/t/p/w300";
    const genre = document.getElementById('genreFilter').value;
    const apiKey = '53c1020b3a0e7aeb482d50f68918374e';
    const response = await fetch(`https://api.themoviedb.org/3/genre/${genre}/movies?api_key=${apiKey}`);
    const data = await response.json();
    const movies = data.results;

    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const movie = movies[Math.floor(Math.random() * movies.length)];
        const movieTitle = movie.title;
        const moviePoster = movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+poster+available";
        const movieOverview = movie.overview;

        const movieItem = `
      <div class="movie">
        <img src="${moviePoster}" alt="${movieTitle} poster">
        <div class="movie-info">
          <h3>${movieTitle}</h3>
          <p>${movieOverview}</p>
        </div>
      </div>
    `;

        movieList.insertAdjacentHTML("beforeend", movieItem);
    }
}

async function GenBooks(subject) {
    const genre = document.getElementById('subject').value;
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}`);
    const data = await response.json();
    const books = data.items;

    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const book = books[Math.floor(Math.random() * books.length)];
        const bookTitle = book.volumeInfo.title;
        const bookCover = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/128x196?text=No+cover+available";
        const bookAuthor = book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Unknown";
        const bookDescription = book.volumeInfo.description ? book.volumeInfo.description : "No description available.";

        const bookEL = document.createElement("div");
        bookEL.classList.add("rowB");
        bookEL.innerHTML = `
    <div class="columnB">
        <img src="${bookCover}" alt="${bookTitle} cover">
    </div> 
    <div class="columnB">
        <h3 class="title">${bookTitle} <br> By ${bookAuthor}</h3>
        <div class="book-description">
            <div class="des">Description: </div>
            <p>${bookDescription}</p>
        </div>
    </div>
`;

        const bookList = document.getElementById("book-list");
        bookList.appendChild(bookEL);
    }
}
