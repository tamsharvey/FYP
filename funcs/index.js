const functions = require("firebase-functions");
const admin = require('firebase-admin');
const axios = require("ajax");
const cors = require('cors')({origin: true});
const express = require("express");
admin.initializeApp();

// exports.searchMovie = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//         return admin.firestore().collection('UserData').add(request.body).then((snapshot) => {
//             response.send("Saved in the database");
//         });
//     })
// });

exports.searchMovie = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const title = request.query.title;
    const apiKey = 'YOUR_API_KEY';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error retrieving movie data from the server');
        }
      })
      .then(data => {
        const results = data.results;
        if (results.length > 0) {
          const movie = results[0];
          return admin.firestore().collection('Movies').add({
            title: movie.title,
            releaseDate: movie.release_date,
            overview: movie.overview
          }).then((snapshot) => {
            response.send("Movie saved to the database");
          });
        } else {
          response.send("Movie not found");
        }
      })
      .catch(error => {
        console.error(error);
        response.status(500).send("Error searching for movie");
      });
  });
});


// exports.uploaduserinfo = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//
//         return admin.firestore().collection('UserData').add(request.body).then((snapshot) => {
//             response.send("Saved in the database");
//         });
//     });
// });
//
// exports.uploadlocation = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//
//         return admin.firestore().collection('UserLocation').add(request.body).then((snapshot) => {
//             response.send("Saved in the database");
//         });
//     });
// });
//
// //get users data
// exports.getusers = functions.https.onRequest((request, response) => {
//
//     cors(request, response, () => {
//         // 1. Connect to our Firestore database
//         let myData = [];
//         admin.firestore().collection('UserData').get().then((snapshot) => {
//
//             if (snapshot.empty) {
//                 console.log('No matching documents.');
//                 response.send('No users ');
//                 return;
//             }
//
//             snapshot.forEach(doc => {
//                 let docObj = {};
//                 docObj.id = doc.id;
//                 myData.push(Object.assign(docObj, doc.data()));
//             });
//
//             // 2. Send data back to client
//             response.send(myData);
//         })
//     });
// });
//
