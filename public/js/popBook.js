
const APIKEY = "dRo9mkNRDFoHrJcriDaKSaiPyuU0mzE7"; // NYT
const API ="https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=dRo9mkNRDFoHrJcriDaKSaiPyuU0mzE7"
const bMain = document.getElementById("content");
const form = document.getElementById("bookForm");
const search = document.getElementById("bookName");
// const button = document.getElementById('myButton');
//
//
// button.addEventListener('click', function() {
//     addToList();
// });

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

        try {
            const id = await getID(isbn);

            const columnEL = document.createElement("div");
            columnEL.classList.add("column");

            const img = `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`;
            const bookEL = document.createElement("div");
            bookEL.classList.add("book");

            columnEL.appendChild(bookEL);

            const btnEL = document.createElement("div");
            btnEL.classList.add("button-container");

            const addToListButton = document.createElement("button");
            addToListButton.classList.add("addToListButton");
            addToListButton.textContent = "Add to List";

            btnEL.appendChild(addToListButton);
            columnEL.appendChild(bookEL);
            columnEL.appendChild(btnEL);

            bookEL.innerHTML = `
              <div class="rowB">
                <div class="columnB">
                  <img src="${img}">
                </div> 
                <div class="columnB">
                  <h3 class="title">${bookInfo.title} <br> By ${bookInfo.author}</h3>
                  <div class="book-description">
                    <div class="des">Description: </div>
                    ${bookInfo.description}
                  </div>
                </div>
              </div>
            `;

            // const addButton = bookEL.querySelector(".addToMyListButton");
            // addButton.addEventListener("click", () => {
            //     // Create a new object with the book data
            //     const bookData = {
            //         title: bookInfo.title,
            //         author: bookInfo.author,
            //         description: bookInfo.description,
            //         img: img
            //     };
            //
            //     // Add the book to the user's list (you will need to implement this on the server side)
            //     addToList(bookData);
            // });

            row.appendChild(columnEL);
        } catch (error) {
            console.log(`Error displaying book with ISBN ${isbn}: ${error}`);
        }
    }
    bMain.appendChild(row);
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
