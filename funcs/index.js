// const firebaseConfig = {
//     apiKey: "AIzaSyCyEbtegGBSKBrX91PLT_fqEPuaJHY3fCk",
//     authDomain: "finalyearproject-837f4.firebaseapp.com",
//     databaseURL: "https://finalyearproject-837f4-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "finalyearproject-837f4",
//     storageBucket: "finalyearproject-837f4.appspot.com",
//     messagingSenderId: "332274706767",
//     appId: "1:332274706767:web:8b13dd202dff70919abd3a",
//     measurementId: "G-CJBQP402TJ"
// };
//
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);


// Import the functions you need from the SDKs you need

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp();

// const allowedOrigins = ['https://finalyearproject-837f4.web.app'];
// const corsOptions = {
//     origin: function(origin, callback) {
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// };

// exports.uploaduserinfo = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//         // response.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5008/Register.html');
//         response.set('Access-Control-Allow-Origin', '*');
//         // Allowing all re
//         response.set('Access-Control-Allow-Methods', 'GET, POST');
//         response.set('Access-Control-Allow-Headers', 'Content-Type');
//         return admin.firestore().collection('UserData').add(request.body).then((snapshot) => {
//             response.send("Saved in the database");
//         });
//     });
// });

//
// exports.getUserData = functions.https.onCall((data, context) => {
//     const uid = context.auth.uid;
//     return admin.auth().getUser(uid)
//         .then((userRecord) => {
//             console.log('User data:', userRecord.toJSON());
//             return { data: userRecord.toJSON() };
//         })
//         .catch((error) => {
//             console.error('Error fetching user data:', error);
//             throw new functions.https.HttpsError('internal', 'Error fetching user data');
//         });
// });

// // Retrieves data from database, forms it and send its back to http request
// exports.searchMovie = functions.https.onRequest((request, response) => {
//     cors()(request, response, () => {
//         const {query} = request.query;
//         const movieName = request.body.movieName;
//         const url = `${movieSearchAPI}&query=${movieName}`;
//
//         https.get(url, (res) => {
//             let data = '';
//
//             res.on('data', (chunk) => {
//                 data += chunk;
//             });
//
//             res.on('end', () => {
//                 const movieData = JSON.parse(data).results;
//                 const formattedData = movieData.map((movie) => {
//                     return {
//                         title: movie.title,
//                         release_date: movie.release_date,
//                         overview: movie.overview,
//                         poster_path: movie.poster_path,
//                         vote_average: movie.vote_average
//                     };
//                 });
//                 response.json(formattedData);
//             });
//         }).on('error', (err) => {
//             console.error(err);
//             response.status(500).send(err);
//         });
//     });
// });
//
// // Triggered by an HTTp request and calls searchMovie function
// exports.search = functions.https.onRequest((req, res) => {
//     const searchTerm = req.query.searchTerm;
//     const url = `${movieSearchAPI}&query=${searchTerm}`;
//
//     https.get(url, (result) => {
//         let data = '';
//         result.on('data', (chunk) => {
//             data += chunk;
//         });
//
//         result.on('end', () => {
//             const movieData = JSON.parse(data).results;
//             console.log(movieData);
//             res.json(movieData);
//         });
//     }).on('error', (err) => {
//         console.error(err);
//         res.status(500).send(err);
//     });
// });

// exports.getusers = functions.https.onRequest((request, response) => {
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
// exports.deleteUser = functions.https.onRequest(async (req, res) => {
//     const user = await admin.auth().currentUser;
//     if (user) {
//         try {
//             await admin.auth().deleteUser(user.uid);
//             console.log(`User with uid: ${user.uid} has been deleted successfully.`);
//             res.status(200).send(`User with uid: ${user.uid} has been deleted successfully.`);
//         } catch (error) {
//             console.error(error);
//             res.status(500).send(`Error deleting user: ${error}`);
//         }
//     } else {
//         console.log('No user is currently logged in.');
//         res.status(400).send('No user is currently logged in.');
//     }
// });
//
//
//
//
//

