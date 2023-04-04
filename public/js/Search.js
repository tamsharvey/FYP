const IMGPATH = "https://image.tmdb.org/t/p/w300";

function searchMovies(searchTerm, mediaType) {
    const searchT = document.getElementById('searchTerm').value;
    const media = document.getElementById('mediaType').value;
    let movieApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=53c1020b3a0e7aeb482d50f68918374e&language=en&query=${searchT}`;
    const bookApiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchT}`;
    const bookApiUrl1 = `https://www.googleapis.com/books/v1/volumes?q=+inauthor:${searchT}`;

    const db = firebase.firestore();

    console.log(searchT);
    console.log(media);

    // Get reference to searchResults div
    const searchResultsDiv = document.querySelector('.searchResults');

    // Clear previous search results
    searchResultsDiv.innerHTML = "";

    if (media === "movie") {

        fetch(movieApiUrl)
            .then(response => response.json())
            .then(data => {

                const movies = data.results;

                // Loop through movies and create HTML elements for each movie
                movies.forEach(movie => {
                    const {poster_path, title, release_date, overview} = movie;

                    const rowEl = document.createElement('div');
                    rowEl.classList.add('rowMo');

                    const col1 = document.createElement('div');
                    col1.classList.add('columnMo');

                    const movieEl = document.createElement('div');
                    movieEl.classList.add('movie');

                    const posterEl = document.createElement('img');
                    posterEl.src = IMGPATH + poster_path;
                    posterEl.alt = title;
                    movieEl.appendChild(posterEl);
                    col1.appendChild(movieEl);
                    rowEl.appendChild(col1);

                    const col2 = document.createElement('div');
                    col2.classList.add('columnMo');

                    const movieInfoEl = document.createElement('div');
                    movieInfoEl.classList.add('movie-info');

                    const titleEl = document.createElement('h3');
                    titleEl.textContent = title;
                    movieInfoEl.appendChild(titleEl);

                    const releaseDateEl = document.createElement('p');
                    releaseDateEl.textContent = `Release Date: ${release_date}`;
                    movieInfoEl.appendChild(releaseDateEl);
                    col2.appendChild(movieInfoEl);

                    const overviewEl = document.createElement('div');
                    overviewEl.classList.add('overview');

                    const overviewHeaderEl = document.createElement('h3');
                    overviewHeaderEl.textContent = 'Overview:';

                    overviewEl.appendChild(overviewHeaderEl);

                    const overviewTextEl = document.createElement('p');
                    overviewTextEl.textContent = overview;

                    overviewEl.appendChild(overviewTextEl);
                    col2.appendChild(overviewEl);

                    const buttonContainer = document.createElement('div');
                    buttonContainer.classList.add('button-container');

                    const addToMyListButton = document.createElement('button');
                    addToMyListButton.classList.add('addToMyListButton');
                    addToMyListButton.textContent = 'Add to List';

                    buttonContainer.appendChild(addToMyListButton);
                    col2.appendChild(buttonContainer);

                    rowEl.appendChild(col2);

                    searchResultsDiv.appendChild(rowEl);
                });

            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage, errorCode);
            });
    }
    else if (media === "book") {
        fetch(bookApiUrl)
            .then(response => response.json())
            .then(data => {

                const books = data.items;

                console.log('Number of books fetched:', books.length);

                // Loop through books and create HTML elements for each book
                books.forEach(book => {
                    const {id, volumeInfo: {author, title, description}} = book;

                    console.log('Processing book:', title);

                    const rowEl = document.createElement('div');
                    rowEl.classList.add('rowBo');

                    const col1 = document.createElement('div');
                    col1.classList.add('columnBo');
                    col1.classList.add('image-container')

                    const bookEl = document.createElement('div');
                    bookEl.classList.add('book');


                    const coverEl = document.createElement('img');
                    coverEl.src = `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`;

                    coverEl.alt = title;
                    coverEl.style.width = '200px';
                    coverEl.style.height = '300px';

                    bookEl.appendChild(coverEl);
                    col1.appendChild(bookEl);
                    rowEl.appendChild(col1);

                    const col2 = document.createElement('div');
                    col2.classList.add('columnBo');

                    const bookInfoEl = document.createElement('div');
                    bookInfoEl.classList.add('book-info');

                    const titleEl = document.createElement('h3');
                    titleEl.textContent = title;

                    bookInfoEl.appendChild(titleEl);

                    const authorEL = document.createElement('h4');
                    authorEL.textContent = author;

                    bookInfoEl.appendChild(authorEL);
                    col2.appendChild(bookInfoEl);

                    const descriptionEl = document.createElement('div');
                    descriptionEl.classList.add('description');

                    const descriptionHeaderEl = document.createElement('h3');
                    descriptionHeaderEl.textContent = 'Description:';

                    descriptionEl.appendChild(descriptionHeaderEl);

                    const descriptionTextEl = document.createElement('p');
                    descriptionTextEl.textContent = description;

                    const buttonContainer1 = document.createElement('div');
                    buttonContainer1.classList.add('button-container');

                    const addToMyListButton = document.createElement('button');
                    addToMyListButton.classList.add('addToMyListButton');
                    addToMyListButton.textContent = 'Add to List';


                    descriptionEl.appendChild(descriptionTextEl);
                    col2.appendChild(descriptionEl);

                    buttonContainer1.appendChild(addToMyListButton);
                    col2.appendChild(buttonContainer1);

                    rowEl.appendChild(col2);

                    // Append rowEl to searchResultsDiv
                    searchResultsDiv.appendChild(rowEl);
                });

                // // Add book to Firestore database
                // db.collection("Books").add({
                //     title: title,
                //     authors: book.volumeInfo.authors,
                //     publishedDate: book.volumeInfo.publishedDate,
                //     description: description,
                //     thumbnailUrl: imageLinks.thumbnail
                // })
                //     .then(docRef => {
                //         console.log("Book added with ID: ", docRef.id);
                //     })
                //     .catch(error => {
                //         console.error("Error adding book: ", error);
                //     });


                fetch(bookApiUrl1)
                    .then(response => response.json())
                    .then(data => {
                        const auth = data.items;

                        console.log('Author Number of books fetched:', books.length);

                        // Loop through books and create HTML elements for each book
                        auth.forEach(book => {
                            const {id, volumeInfo: {author, title, description}} = book;

                            console.log('Processing book:', title);

                            const rowEl = document.createElement('div');
                            rowEl.classList.add('rowBo');

                            const col1 = document.createElement('div');
                            col1.classList.add('columnBo');
                            col1.classList.add('image-container')

                            const bookEl = document.createElement('div');
                            bookEl.classList.add('book');


                            const coverEl = document.createElement('img');
                            coverEl.src = `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`;

                            coverEl.alt = title;
                            coverEl.style.width = '200px';
                            coverEl.style.height = '300px';

                            bookEl.appendChild(coverEl);
                            col1.appendChild(bookEl);
                            rowEl.appendChild(col1);

                            const col2 = document.createElement('div');
                            col2.classList.add('columnBo');

                            const bookInfoEl = document.createElement('div');
                            bookInfoEl.classList.add('book-info');

                            const titleEl = document.createElement('h3');
                            titleEl.textContent = title;

                            bookInfoEl.appendChild(titleEl);

                            const authorEL = document.createElement('h4');
                            authorEL.textContent = author;

                            bookInfoEl.appendChild(authorEL);
                            col2.appendChild(bookInfoEl);

                            const descriptionEl = document.createElement('div');
                            descriptionEl.classList.add('description');

                            const descriptionHeaderEl = document.createElement('h3');
                            descriptionHeaderEl.textContent = 'Description:';

                            descriptionEl.appendChild(descriptionHeaderEl);

                            const descriptionTextEl = document.createElement('p');
                            descriptionTextEl.textContent = description;

                            const buttonContainer1 = document.createElement('div');
                            buttonContainer1.classList.add('button-container');

                            const addToMyListButton = document.createElement('button');
                            addToMyListButton.classList.add('addToMyListButton');
                            addToMyListButton.textContent = 'Add to List';


                            descriptionEl.appendChild(descriptionTextEl);
                            col2.appendChild(descriptionEl);

                            buttonContainer1.appendChild(addToMyListButton);
                            col2.appendChild(buttonContainer1);

                            rowEl.appendChild(col2);

                            // Append rowEl to searchResultsDiv
                            searchResultsDiv.appendChild(rowEl);
                        });


                    })
                    .catch(error => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorMessage, errorCode);
                    });
            })
    }
    else if (media === "both") {
        const moviesContainer = document.createElement('div');
        moviesContainer.classList.add('movies-container');
        const booksContainer = document.createElement('div');
        booksContainer.classList.add('books-container');
        searchResultsDiv.appendChild(moviesContainer);
        searchResultsDiv.appendChild(booksContainer);

        fetch(movieApiUrl)
            .then(response => response.json())
            .then(data => {

                const both = data.results;

                // Loop through movies and create HTML elements for each movie
                both.forEach(movie => {
                    const {poster_path, title, release_date, overview} = movie;

                    const rowEl = document.createElement('div');
                    rowEl.classList.add('rowMo');

                    const col1 = document.createElement('div');
                    col1.classList.add('columnMo');

                    const movieEl = document.createElement('div');
                    movieEl.classList.add('movie');

                    const posterEl = document.createElement('img');
                    posterEl.src = IMGPATH + poster_path;
                    posterEl.alt = title;
                    movieEl.appendChild(posterEl);
                    col1.appendChild(movieEl);
                    rowEl.appendChild(col1);

                    const col2 = document.createElement('div');
                    col2.classList.add('columnMo');

                    const movieInfoEl = document.createElement('div');
                    movieInfoEl.classList.add('movie-info');

                    const titleEl = document.createElement('h3');
                    titleEl.textContent = title;
                    movieInfoEl.appendChild(titleEl);

                    const releaseDateEl = document.createElement('p');
                    releaseDateEl.textContent = `Release Date: ${release_date}`;
                    movieInfoEl.appendChild(releaseDateEl);
                    col2.appendChild(movieInfoEl);

                    const overviewEl = document.createElement('div');
                    overviewEl.classList.add('overview');

                    const overviewHeaderEl = document.createElement('h3');
                    overviewHeaderEl.textContent = 'Overview:';

                    overviewEl.appendChild(overviewHeaderEl);

                    const overviewTextEl = document.createElement('p');
                    overviewTextEl.textContent = overview;

                    overviewEl.appendChild(overviewTextEl);
                    col2.appendChild(overviewEl);

                    const buttonContainer = document.createElement('div');
                    buttonContainer.classList.add('button-container');

                    const addToMyListButton = document.createElement('button');
                    addToMyListButton.classList.add('addToMyListButton');
                    addToMyListButton.textContent = 'Add to List';

                    buttonContainer.appendChild(addToMyListButton);
                    col2.appendChild(buttonContainer);

                    rowEl.appendChild(col2);

                    moviesContainer.appendChild(rowEl);
                });

                fetch(bookApiUrl)
                    .then(response => response.json())
                    .then(data => {

                        const books = data.items;

                        console.log('Number of books fetched:', books.length);

                        // Loop through books and create HTML elements for each book
                        books.forEach(book => {
                            const {id, volumeInfo: {author, title, description}} = book;

                            console.log('Processing book:', title);

                            const rowEl = document.createElement('div');
                            rowEl.classList.add('rowBo');

                            const col1 = document.createElement('div');
                            col1.classList.add('columnBo');
                            col1.classList.add('image-container')

                            const bookEl = document.createElement('div');
                            bookEl.classList.add('book');


                            const coverEl = document.createElement('img');
                            coverEl.src = `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`;

                            coverEl.alt = title;
                            coverEl.style.width = '200px';
                            coverEl.style.height = '300px';

                            bookEl.appendChild(coverEl);
                            col1.appendChild(bookEl);
                            rowEl.appendChild(col1);

                            const col2 = document.createElement('div');
                            col2.classList.add('columnBo');

                            const bookInfoEl = document.createElement('div');
                            bookInfoEl.classList.add('book-info');

                            const titleEl = document.createElement('h3');
                            titleEl.textContent = title;

                            bookInfoEl.appendChild(titleEl);

                            const authorEL = document.createElement('h4');
                            authorEL.textContent = author;

                            bookInfoEl.appendChild(authorEL);
                            col2.appendChild(bookInfoEl);

                            const descriptionEl = document.createElement('div');
                            descriptionEl.classList.add('description');

                            const descriptionHeaderEl = document.createElement('h3');
                            descriptionHeaderEl.textContent = 'Description:';

                            descriptionEl.appendChild(descriptionHeaderEl);

                            const descriptionTextEl = document.createElement('p');
                            descriptionTextEl.textContent = description;

                            const buttonContainer1 = document.createElement('div');
                            buttonContainer1.classList.add('button-container');

                            const addToMyListButton = document.createElement('button');
                            addToMyListButton.classList.add('addToMyListButton');
                            addToMyListButton.textContent = 'Add to List';


                            descriptionEl.appendChild(descriptionTextEl);
                            col2.appendChild(descriptionEl);

                            buttonContainer1.appendChild(addToMyListButton);
                            col2.appendChild(buttonContainer1);

                            rowEl.appendChild(col2);

                            // Append rowEl to searchResultsDiv
                            booksContainer.appendChild(rowEl);
                        });

                        // // Add book to Firestore database
                        // db.collection("Books").add({
                        //     title: title,
                        //     authors: book.volumeInfo.authors,
                        //     publishedDate: book.volumeInfo.publishedDate,
                        //     description: description,
                        //     thumbnailUrl: imageLinks.thumbnail
                        // })
                        //     .then(docRef => {
                        //         console.log("Book added with ID: ", docRef.id);
                        //     })
                        //     .catch(error => {
                        //         console.error("Error adding book: ", error);
                        //     });


                        fetch(bookApiUrl1)
                            .then(response => response.json())
                            .then(data => {
                                const auth = data.items;

                                // Loop through books and create HTML elements for each book
                                auth.forEach(book => {
                                    const {id, volumeInfo: {author, title, description}} = book;

                                    console.log('Processing book:', title);

                                    const rowEl = document.createElement('div');
                                    rowEl.classList.add('rowBo');

                                    const col1 = document.createElement('div');
                                    col1.classList.add('columnBo');
                                    col1.classList.add('image-container')

                                    const bookEl = document.createElement('div');
                                    bookEl.classList.add('book');


                                    const coverEl = document.createElement('img');
                                    coverEl.src = `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`;

                                    coverEl.alt = title;
                                    coverEl.style.width = '200px';
                                    coverEl.style.height = '300px';

                                    bookEl.appendChild(coverEl);
                                    col1.appendChild(bookEl);
                                    rowEl.appendChild(col1);

                                    const col2 = document.createElement('div');
                                    col2.classList.add('columnBo');

                                    const bookInfoEl = document.createElement('div');
                                    bookInfoEl.classList.add('book-info');

                                    const titleEl = document.createElement('h3');
                                    titleEl.textContent = title;

                                    bookInfoEl.appendChild(titleEl);

                                    const authorEL = document.createElement('h4');
                                    authorEL.textContent = author;

                                    bookInfoEl.appendChild(authorEL);
                                    col2.appendChild(bookInfoEl);

                                    const descriptionEl = document.createElement('div');
                                    descriptionEl.classList.add('description');

                                    const descriptionHeaderEl = document.createElement('h3');
                                    descriptionHeaderEl.textContent = 'Description:';

                                    descriptionEl.appendChild(descriptionHeaderEl);

                                    const descriptionTextEl = document.createElement('p');
                                    descriptionTextEl.textContent = description;

                                    const buttonContainer1 = document.createElement('div');
                                    buttonContainer1.classList.add('button-container');

                                    const addToMyListButton = document.createElement('button');
                                    addToMyListButton.classList.add('addToMyListButton');
                                    addToMyListButton.textContent = 'Add to List';


                                    descriptionEl.appendChild(descriptionTextEl);
                                    col2.appendChild(descriptionEl);

                                    buttonContainer1.appendChild(addToMyListButton);
                                    col2.appendChild(buttonContainer1);

                                    rowEl.appendChild(col2);

                                    // Append rowEl to searchResultsDiv
                                    booksContainer.appendChild(rowEl);
                                });


                            })
                            .catch(error => {
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                console.log(errorMessage, errorCode);
                            });
                    })
            })
    }
}

function switchToGenerateMoviesPage() {
    window.location.href = "./GenMovies.html";
}
