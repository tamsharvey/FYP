
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

//post comments
exports.postcomments= functions.https.onRequest((request,response) => {

    cors(request, response, () => {
       const currentTime = admin.firestore.Timestamp.now();
        request.body.timestamp = currentTime;

        return admin.firestore().collection('comments').add(request.body).then(()=>{
        response.send("Saved in the database");
});

  //get comments
  exports.getcomments = functions.https.onRequest((request, response) => {

 cors(request, response, () => {

     let myData = []
return admin.firestore().collection('comments').orderBy("timestamp","desc").get().then((snapshot) => {
                    if (snapshot.empty) {
                    console.log('No matching documents.');
                    response.send('No data in database');
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

     //delete comments

     exports.deletecomment = functions.https.onRequest((request, response) => {
cors(request, response, () => {
// your function body here - use the provided req and res from cors
admin.firestore().collection("comments").doc(request.query.id).delete().then(function()
{
response.send("Document successfully deleted!");
})
});

        //update comments
             exports.updatecomment = functions.https.onRequest((request, response) => {
cors(request, response, () => {
// your function body here - use the provided req and res from cors
admin.firestore().collection("comments").doc(request.query.id).update().then(function()
{
response.send("Document successfully updated!");
})
});
});

exports.authorizedendpoint = functions.https.onRequest((request, response) => {
    cors(request, response,() => {

        console.log('Check if request is authorized with Firebase ID token');
        if ((!request.headers.authorization || !request.headers.authorization.startsWith('Bearer'))){
            console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
                'Make sure you authorize your request by providing the following HTTP header:',
                'Authorization: Bearer <Firebase ID Token>');
            response.status(403).send('Unauthorized');
            return;
        }
        let idToken;
        if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')){
            console.log('Found "Authorization" header');
            // Read the ID Token from the Authorization header.
            idToken = request.headers.authorization.split('Bearer')[1];
        } else{
            // No cookie
            response.status(403).send('Unauthorized');
            return;
        }

        try {
            const decodedIdToken = admin.auth().verifyIdToken(idToken).then((token) => {
                console.log('ID Token correctly decoded', token);
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
        } catch (error) {
            console.error('Error while verifying Firebase ID token:', error);
            response.status(403).send('Unauthorized');
            return;
        }
    });


/*
http.open("GET","FirebaseFunctionURL"+"?latitude="+latitude+"&longitude="+longitude);

var latitude;
var longitude;


function successCallBack(position)
{
  latitude=position.coords.latitude
  longitude=position.coords.longitude
}

function failureCallback(error)
{
 console.log(error);
 if(error.code==1)
{
latitude:NUMBER_OF_YOUR_CHOICE;
longitude:NUMBER_OF_YOUR_CHOICE;
}
}


exports.FindLocation = functions.https.onRequest((request, response) => {
cors(request, response, () => {
var latitude=request.query.latitude;
var longitude=request.query.longitude;


	collectionReference.where("latitude","<=","150",VARIABLE YOU PROVIDE)

      })//end of cors
    });
	*/


});
