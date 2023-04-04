
/* jshint esversion: 6 */
/* jshint esversion: 8 */

// const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=53c1020b3a0e7aeb482d50f68918374e";
const IMGPATH = "https://image.tmdb.org/t/p/w300";

const main = document.getElementById("content");

// initially get fav movies
getMovies("https://api.themoviedb.org/3/discover/movie?api_key=53c1020b3a0e7aeb482d50f68918374e");

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
        const {poster_path, title, vote_average, overview, release_date} = movie;

        const movieData = {
            title: title, // Use 'title' instead of 'movie.title'
            release_date: release_date,
            overview: overview,
            img: poster_path
        };

        const col = document.createElement("div");
        col.classList.add("column");

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        col.appendChild(movieEl);


        movieEl.innerHTML = `
        <div>
            <div class="rowM">
                <button class="addToMyListButton">Add To List</button>
            </div>
        
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
        </div>`;

        rw.appendChild(col);

        // Add an event listener for the button using async
        const button = movieEl.querySelector(".addToMyListButton");
        button.addEventListener("click", async () => {
            try {
                await addDataToFirestore(movieData);
                console.log('Data added successfully');
            } catch (error) {
                console.error('Error adding data:', error);
            }
        });

        // Add an event listener for the button - using then and catch
        // const button = movieEl.querySelector(".addToMyListButton");
        // button.addEventListener("click", () => {
        //     addDataToFirestore(movieData)
        //         .then(() => {
        //             console.log('Data added successfully');
        //         })
        //         .catch((error) => {
        //             console.error('Error adding data:', error);
        //         });
        // });

        // const addButton = addToMyListButton;
        // addButton.addEventListener("click", () => {
        //     // Create a new object with the movie data
        //     const movieData = {
        //         title: title, // Use 'title' instead of 'movie.title'
        //         release_date: release_date,
        //         overview: overview,
        //         img: poster_path
        //     }
        //
        // });
        // col.appendChild(movieEl); // Append movieEl to col
        // rw.appendChild(col); // Append col to rw

        main.appendChild(rw); // Append rw to main
    });
}

window.addDataToFirestore = function(movieData) {
    return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;

        if (user) {
            const uid = user.uid;
            const db = firebase.firestore();
            const userMoviesRef = db.collection("Users").doc(uid).collection("Movies");

            userMoviesRef.add(movieData)
                .then(docRef => {
                    console.log("Movie added with ID: ", docRef.id);
                    resolve({ data: { id: docRef.id } });
                })
                .catch(error => {
                    console.error("Error adding movie: ", error);
                    reject(error);
                });
        } else {
            console.error("User is not signed in.");
            reject(new Error("User is not signed in."));
        }
    });
}

/**
 * Movie data object.
 * @typedef {Object} MovieData
 * @property {string} title - The title of the movie.
 * @property {string} release_date - The release date of the movie.
 * @property {string} overview - A brief overview of the movie.
 * @property {string} img - The path to the movie's poster image.
 */


// window.addDataToFirestore = function(movieData) {
//     console.log("Test1");
//     return new Promise((resolve, reject) => {
//         const user = firebase.auth().currentUser;
//         console.log("Test2");
//         if (user) {
//             const uid = user.uid;
//             const db = firebase.firestore();
//             const userMoviesRef = db.collection("Users").doc(uid).collection("Movies");
//
//             userMoviesRef.add(movieData)
//                 .then(docRef => {
//                     console.log("Movie added with ID: ", docRef.id);
//                     resolve({ data: { id: docRef.id } });
//                 })
//                 .catch(error => {
//                     console.error("Error adding movie: ", error);
//                     reject(error);
//                 });
//         } else {
//             console.error("User is not signed in.");
//             reject(new Error("User is not signed in."));
//         }
//     });
// }

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}
