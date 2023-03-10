

const APIKEY = "dRo9mkNRDFoHrJcriDaKSaiPyuU0mzE7";
const API ="https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=dRo9mkNRDFoHrJcriDaKSaiPyuU0mzE7"
const bMain = document.getElementById("book");
const form = document.getElementById("bookForm");
const search = document.getElementById("bookName");

const books = document.getElementById('book');

fetch(API)

    .then(data=> {
        console.log(data);

        data.results.map(bk =>{
            console.log(bk.title);

            let a = document.createElement("a");
            a.innerHTML = bk.title;

            let b = document.createElement("a");
            b.innerHTML = bk.description;

            books.appendChild(a);
            books.appendChild(b);
        })
    })


// fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=dRo9mkNRDFoHrJcriDaKSaiPyuU0mzE7', {
//     method: 'get',
// })
//     .then(response => { return response.json(); })
//     .then(json => { updateBestSellers(json); })
//     .catch(error => {
//         console.log('NYT API Error: Defaulting to nytimes archival data.', error);
//         updateBestSellers(nytimesArchive);
//     });
//
// function updateBestSellers(nytimesBestSellers) {
//     nytimesBestSellers.results.forEach(function(book) {
//         main.innerHTML = "";
//         const isbn = book.isbns[0].isbn10;
//         const bookInfo = book.book_details[0];
//
//         const bookEL = document.createElement("div");
//         bookEL.classList.add("nytimesBestSellers");
//
//         bookEL.innerHTML = `
//             <div id="book.rank" class="entry">
//             <p>
//             <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png" class="book-cover" id="cover-' + book.rank + '">
//             </p>
//             <h2><a href="book.amazon_product_url" target="_blank">${bookInfo.title}</a></h2>
//             <h4>By ${bookInfo.author} </h4>
//             <h4 class="publisher">${bookInfo.publisher}</h4>
//             <p>${bookInfo.description} </p>
//             <div class="stats">
//             <hr>
//             </div>
//             </div>
//             `;
//         main.appendChild(bookEL);
//         updateCover(book.rank, isbn);
//      });

// function updateBestSellers(nytimesBestSellers) {
//
//     nytimesBestSellers.results.forEach(function (book) {
//         const isbn = book.isbns[0].isbn10;
//         const bookInfo = book.book_details[0];
//
//         const bookEL = document.createElement("div");
//         bookEL.classList.add("movie");
//
//         bookEL.innerHTML = `
//             <div class="movie-info">
//                 <h3>${bookInfo.title}</h3>
//             </div>
//             <div class="overview">
//                 <h3>Overview:</h3>
//                 ${bookInfo.overview}
//             </div>
//         `;
//
//         bMain.append(bookEL);
//         // $('#' + book.rank).attr('nyt-rank', book.rank);
//         //
//         // updateCover(book.rank, isbn);
//     });
// }
// }
// function updateCover(id, isbn) {
//     fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + "&key=AIzaSyBlArJNUOrqx7UXL5QXTvo_QqRnS7LB3VA", {
//         method: 'get'
//     })
//         .then(response => { return response.json(); })
//         .then(data => {
//             let img = data.items[0].volumeInfo.imageLinks.thumbnail;
//             img = img.replace(/^http:\/\//i, 'https://');
//             $('#cover-' + id).attr('src', img);
//         })
//         .catch(error => {
//             console.log(error);
//             // console.log('Googel API Error: Defaulting to archival images for book #' + id + ' ISBN: ' + isbn);
//             // var index = id - 1;
//             // var img = archivedImages[index];
//             // $('#cover-' + id).attr('src', img);
//         });
// }
//
// $(window).scroll(function (event) {
//     const scroll = $(window).scrollTop();
//     if (scroll > 50) {
//         $('#masthead').css({'height':'50', 'padding' : '8'})
//         $('#nyt-logo').css({'height':'35'})
//     } else {
//         $('#masthead').css({'height':'100', 'padding':'10'});
//         $('#nyt-logo').css({'height':'80'})
//     }
// });




// const BestSellersAPI = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=dRo9mkNRDFoHrJcriDaKSaiPyuU0mzE7";
//
// const main = document.getElementById("content");
// const form = document.getElementById("bookForm");
// const search = document.getElementById("bookName");
//
// // Initially get best-selling books
// getTopBooks(BestSellersAPI);
//
// async function getTopBooks(url) {
//     const resp = await fetch(url);
//     const respData = await resp.json();
//
//     console.log(respData);
//
//     showBooks(respData.results);
// }
//
// function showBooks(books) {
//     // clear main
//     main.innerHTML = "";
//
//     books.forEach((books) => {
//         const {title, author, description } = books;
//
//         const bookEl = document.createElement("div");
//         bookEl.classList.add("book");
//
//         bookEl.innerHTML = `
//             <div class="book-info">
//                 <h3>${title}</h3>
//
//             </div>
//             <div class="author">
//                 <h3>Auth0r:</h3>
//                 ${author}
//             </div>
//             <div class="overview">
//                 <h3>Description:</h3>
//                 ${description}
//             </div>
//         `;
//
//         main.appendChild(bookEl);
//     });
// }
//
// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//
//     const bookSearch = search.value;
//
//     if (bookSearch) {
//         getTopBooks(BestSellersAPI + bookSearch);
//
//         search.value = "";
//     }
// });