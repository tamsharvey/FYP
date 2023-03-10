
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

    console.log(respData);

    showBooks(respData.results);
}

async function showBooks(books) {
    // clear main
    bMain.innerHTML = "";

    for (const book of books) {
        const bookInfo = book.book_details[0];
        const isbn = book.isbns[0].isbn10;

        try {
            const id = await getID(isbn);

            const img = `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`;
            console.log(img);
            const bookEL = document.createElement("div");
            bookEL.classList.add("book");

            bookEL.innerHTML = `
            <div class="row">
                <div class="column">
                    <img src="${img}">
                </div> 
                <div class="column">
                    <h3>${bookInfo.title} - By ${bookInfo.author}</h3>
                    <h3>Description:</h3>
                     ${bookInfo.description}
                </div>
            <hr>
            </div>
        `;

            bMain.appendChild(bookEL);
        } catch (error) {
            console.log(`Error displaying book with ISBN ${isbn}: ${error}`);
        }
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
