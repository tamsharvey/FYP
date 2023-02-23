const functions = require("firebase-functions");
const admin = require('firebase-admin');
const axios = require("ajax");
const cors = require('cors')({origin: true});
admin.initializeApp();

exports.searchMovie = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const movieTitle = request.query.title;
        const apiKey = '53c1020b3a0e7aeb482d50f68918374e'; // Replace with your API key

        const apiUrl = `https://us-central1-finalyearproject-837f4.cloudfunctions.net/searchMovie?title=${movieTitle}&apiKey=${apiKey}`;

        axios.get(apiUrl)
            .then((apiResponse) => {
                response.status(200).send(apiResponse.data);
            })
            .catch((error) => {
                console.error(error);
                response.status(500).send('Error accessing API');
            });
    })
});

exports.uploaduserinfo = functions.https.onRequest((request, response) => {
    cors(request, response, () => {

        return admin.firestore().collection('UserData').add(request.body).then((snapshot) => {
            response.send("Saved in the database");
        });
    });
});

exports.uploadlocation = functions.https.onRequest((request, response) => {
    cors(request, response, () => {

        return admin.firestore().collection('UserLocation').add(request.body).then((snapshot) => {
            response.send("Saved in the database");
        });
    });
});

//get users data
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

