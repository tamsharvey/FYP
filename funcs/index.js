// const functions = require("firebase-functions");
// const admin = require('firebase-admin');
// const axios = require("ajax");
// const cors = require('cors')({origin: true});
// const https = require('https');
// admin.initializeApp();
//
// const apiKey = '53c1020b3a0e7aeb482d50f68918374e'; // Replace with your API key
// // const SearchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US`;
// const movieSearchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;
//
// const firebaseAPI = "https://us-central1-finalyearproject-837f4.cloudfunctions.net/searchMovie";
//
// exports.searchMovie = functions.https.onRequest((request, response) => {
//     cors()(request, response, () => {
//         // Get the query parameters from the request URL
//         const { query } = request.query;
//
//         // Make a GET request to the MovieDB API endpoint
//         axios.get(`${movieSearchAPI}&query=${query}`)
//             .then((res) => {
//                 // Format the data and send it back as JSON
//                 const data = res.data.results.map((movie) => {
//                     return {
//                         title: movie.title,
//                         release_date: movie.release_date,
//                         overview: movie.overview,
//                         poster_path: movie.poster_path,
//                         vote_average: movie.vote_average
//                     };
//                 });
//                 response.json(data);
//             })
//             .catch((err) => {
//                 console.error(err);
//                 response.status(500).send(err);
//             });
//     });
// });
//
// async function searchMovie(query) {
//     const https = require('https');
//
//     // Make a GET request to your Firebase Cloud Function with the search term as a query parameter
//     https.get(query, (res) => {
//         let data = '';
//
//         res.on('data', (chunk) => {
//             data += chunk;
//         });
//
//         res.on('end', () => {
//             // Parse the response data as JSON and call the showMovies function
//             const json = JSON.parse(data);
//             showMovies(json);
//         });
//
//     }).on('error', (error) => {
//         console.error(error);
//     });
// }
//
//
// // async function searchMovie(query) {
// //
// //     const fetch = await import('node-fetch');
// //     // Make a GET request to your Firebase Cloud Function with the search term as a query parameter
// //     fetch(query)
// //         .then(response => response.json())
// //         .then(data => {
// //             // Call the showMovies function with the movie data returned by the Firebase Cloud Function
// //             showMovies(data);
// //         })
// //         .catch(error => console.error(error));
// // }
//
// exports.search = functions.https.onRequest((req, res) => {
//     const searchTerm = req.query.searchTerm;
//     searchMovie(movieSearchAPI + "?query=" + searchTerm);
//     res.send("Searching for: " + searchTerm);
// });
//
//
//


const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const https = require('https');

admin.initializeApp();

const apiKey = '53c1020b3a0e7aeb482d50f68918374e';
const movieSearchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;

// Retrieves data from database, forms it and send its back to http request
exports.searchMovie = functions.https.onRequest((request, response) => {
    cors()(request, response, () => {
        const { query } = request.query;
        const movieName = request.body.movieName;
        const url = `${movieSearchAPI}&query=${movieName}`;

        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                const movieData = JSON.parse(data).results;
                const formattedData = movieData.map((movie) => {
                    return {
                        title: movie.title,
                        release_date: movie.release_date,
                        overview: movie.overview,
                        poster_path: movie.poster_path,
                        vote_average: movie.vote_average
                    };
                });
                response.json(formattedData);
            });
        }).on('error', (err) => {
            console.error(err);
            response.status(500).send(err);
        });
    });
});

// Triggered by an HTTp request and calls searchMovie function
exports.search = functions.https.onRequest((req, res) => {
    const searchTerm = req.query.searchTerm;
    const url = `${movieSearchAPI}&query=${searchTerm}`;

    https.get(url, (result) => {
        let data = '';
        result.on('data', (chunk) => {
            data += chunk;
        });

        result.on('end', () => {
            const movieData = JSON.parse(data).results;
            console.log(movieData);
            res.json(movieData);
        });
    }).on('error', (err) => {
        console.error(err);
        res.status(500).send(err);
    });
});

exports.uploaduserinfo = functions.https.onRequest((request, response) => {
    cors(request, response, () => {

        return admin.firestore().collection('UserData').add(request.body).then((snapshot) => {
            response.send("Saved in the database");
        });
    });
});

exports.getusers = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        // 1. Connect to our Firestore database
        let myData = [];
        admin.firestore().collection('UserData').get().then((snapshot) => {

            if (snapshot.empty) {
                console.log('No matching documents.');
                response.send('No users ');
                return;
            }

            snapshot.forEach(doc => {
                let docObj = {};
                docObj.id = doc.id;
                myData.push(Object.assign(docObj, doc.data()));
            });

            // 2. Send data back to client
            response.send(myData);
        })
    });
});


