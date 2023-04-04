
const APIKEY = "dRo9mkNRDFoHrJcriDaKSaiPyuU0mzE7"; // NYT
const API ="https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=dRo9mkNRDFoHrJcriDaKSaiPyuU0mzE7"
const bMain = document.getElementById("content");
const form = document.getElementById("bookForm");
const search = document.getElementById("bookName");

// initially get fav movies
NYTBooks(API);

async function NYTBooks(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    showBooks(respData.results);
}

async function showBooks(books) {
    // clear main
    bMain.innerHTML = "";

    const row = document.createElement("div");
    row.classList.add("row");

    for (const book of books) {
        const bookInfo = book.book_details[0];
        const isbn = book.isbns[0].isbn10;
        const reviews = book.reviews;

        try {

            const id = await getID(isbn);
            const rating = await getBookRating(id);

            const columnEL = document.createElement("div");
            columnEL.classList.add("column");

            const img = `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`;
            const bookEL = document.createElement("div");
            bookEL.classList.add("book");

            columnEL.appendChild(bookEL);

            const bookData = {
                title: bookInfo.title, // Use 'title' instead of 'movie.title'
                author: bookInfo.author,
                description: bookInfo.description,
                img: img,
                rating: rating
            };

            bookEL.innerHTML = `
            <div>
                <div class="rowM">
                    <button class="addToMyListButton">Add To List</button>
                </div>
                <div class="rowB">
                    <div class="columnB">
                        <img src="${img}">
                    </div> 
                    <div class="columnB">
                        <div class="book-info">
                            <h3 class="title">${bookInfo.title} <br> By ${bookInfo.author}</h3>
                            <span class="${getBookRating(id)}">${rating}</span>
                        </div>
                        <div class="des">
                            <h3>Description:</h3>
                            ${bookInfo.description}
                        </div>
                    </div>
                </div>
            </div>
            `;

            // Add an event listener for the button using async
            const button = bookEL.querySelector(".addToMyListButton");
            button.addEventListener("click", async () => {
                try {
                    await addDataToFirestore(bookData);
                    console.log('Data added successfully');
                } catch (error) {
                    console.error('Error adding data:', error);
                }
            });

            row.appendChild(columnEL);
        } catch (error) {
            console.log(`Error displaying book with ISBN ${isbn}: ${error}`);
        }
    }
    bMain.appendChild(row);
}

function getBookRating(id) {
    return fetch(`https://www.googleapis.com/books/v1/volumes/${id}`, {
        method: 'get'
    })
        .then(response => { return response.json(); })
        .then(data => {
            const rating = data.volumeInfo.averageRating || 'N/A';
            return rating;
        })
        .catch(error => {
            console.log(error);
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

function getID(isbn) {
    return fetch('https://www.googleapis.com/books/v1/volumes/?q=isbn:' + isbn , {
        method: 'get'
    })
        .then(response => { return response.json(); })
        .then(data => {
            const bookID = data.items[0]?.id;
            return bookID;
        })
        .catch(error => {
            console.log(error);
        });
}


window.addDataToFirestore = function(bookData) {
    const db = firebase.firestore();
    const userMoviesRef = db.collection("Movies");

    return userMoviesRef.add(bookData)
        .then(docRef => {
            console.log("Movie added with ID: ", docRef.id);
            return { data: { id: docRef.id } };
        })
        .catch(error => {
            console.error("Error adding movie: ", error);
            throw error;
        });
}
