// const admin = require('firebase-admin');
// const serviceAccount = require('/Users/tamsinharvey/Documents/College/4th Year/FYP/App/public/json_files/finalyearproject-837f4-firebase-adminsdk-1b0y6-052089f376.json');
//
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://finalyearproject-837f4-default-rtdb.europe-west1.firebasedatabase.app",
//     storageBucket: "gs://finalyearproject-837f4.appspot.com"
// });
//


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
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

exports.createUser = functions.auth.user().onCreate(async (user) => {

    const uid = user.uid;
    const email = user.email;
    const displayName = user.displayName;

    console.log(displayName);

    // let firstName, lastName;

    // if (displayName) {
    //     const nameParts = displayName.split(" ");
    //     firstName = nameParts[0];
    //     lastName = nameParts[1];
    //
    // }
    // else {
    //     try {
    //         const doc = await admin.firestore().collection('UserData').doc(uid).get();
    //         if (doc.exists) {
    //             firstName = doc.data().firstName;
    //             lastName = doc.data().lastName;
    //         } else {
    //             console.log("No such document!");
    //         }
    //     } catch (error) {
    //         console.log("Error getting document:", error);
    //     }
    // }

    const userData = {
        displayName: displayName || '',
        Email: email || '',
        UID: uid
    };
    try {
        await admin.firestore().collection('UserData').doc(uid).set(userData);
        console.log("User data added to Firestore");

    } catch (error) {
        console.log("Error adding user data to Firestore:", error);
    }
});

// exports.addToMyList = functions.firestore
//     .document('users/{userId}/list/{bookId}')
//     .onCreate((snap, context) => {
//         const bookData = snap.data();
//         const userId = context.params.userId;
//
//         // Add the book to the user's list
//         return admin.firestore().collection('users').doc(userId).update({
//             list: admin.firestore.FieldValue.arrayUnion(bookData)
//         });
//     });
//
// exports.addMovie = functions.https.onCall((data, context) => {
//     const { title, author, description, img } = data;
//     const db = admin.firestore();
//     const movieRef = db.collection('Movies').doc();
//     return movieRef.set({ title, author, description, img, id: movieRef.id })
//         .then(() => ({ id: movieRef.id }))
//         .catch(error => {
//             console.error('Error adding movie to database:', error);
//             throw new functions.https.HttpsError('internal', 'Error adding movie to database');
//         });
// });

// exports.addmovie = functions.https.onCall((data, context) => {
//     // Get the current user ID
//     const userId = context.auth.uid;
//
//     // Get a reference to the user document
//     const userRef = admin.firestore().collection("Users").doc(userId);
//
//     // Add the movie data to the user's "movies" subcollection
//     return userRef.collection("movies").add(data)
//         .then((docRef) => {
//             console.log("Movie added to user's list with ID:", docRef.id);
//             return { message: "Movie added successfully" };
//         })
//         .catch((error) => {
//             console.error("Error adding movie to user's list:", error);
//             throw new functions.https.HttpsError("unknown", error.message);
//         });
// });
// exports.createUser = functions.auth.user().onCreate((user) => {
//     const userData = {
//         firstName: request.body.firstName,
//         lastName: request.body.lastName,
//         email: user.email,
//     };
//
//     return admin.firestore().collection('UserData').doc(user.uid).set(userData);
// });

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

