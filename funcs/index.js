
const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp();

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

exports.getlocation = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        // 1. Connect to our Firestore database
        let myData = [];
        admin.firestore().collection('UserLocation').get().then((snapshot) => {

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

