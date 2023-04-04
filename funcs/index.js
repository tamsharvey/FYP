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

    const userData = {
        displayName: displayName || '',
        Email: email || '',
        UID: uid
    };
    try {
        await admin.firestore().collection('UserData').doc(uid).set(userData);
        console.log("User data added to Firestore");
        // Create the Movies collection for the new user
        await admin.firestore().collection("Users").doc(uid).collection("Movies").add({});

        // Create the Books collection for the new user
        await admin.firestore().collection("Users").doc(uid).collection("Books").add({});

        console.log("Movies and Books collections added for the user.");

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
//     const { title, author, description, assets } = data;
//     const db = admin.firestore();
//     const movieRef = db.collection('Movies').doc();
//     return movieRef.set({ title, author, description, assets, id: movieRef.id })
//         .then(() => ({ id: movieRef.id }))
//         .catch(error => {
//             console.error('Error adding movie to database:', error);
//             throw new functions.https.HttpsError('internal', 'Error adding movie to database');
//         });
// });


