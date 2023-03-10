import {request} from "axios";

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const https = require('https');
const firebase = require("firebase");

admin.initializeApp();

const apiKey = '53c1020b3a0e7aeb482d50f68918374e';
const movieSearchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;


// Retrieves data from database, forms it and send its back to http request
exports.searchMovie = functions.https.onRequest((request, response) => {
    cors()(request, response, () => {
        const {query} = request.query;
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

exports.deleteUser = functions.https.onRequest(async (req, res) => {
    const user = await admin.auth().currentUser;
    if (user) {
        try {
            await admin.auth().deleteUser(user.uid);
            console.log(`User with uid: ${user.uid} has been deleted successfully.`);
            res.status(200).send(`User with uid: ${user.uid} has been deleted successfully.`);
        } catch (error) {
            console.error(error);
            res.status(500).send(`Error deleting user: ${error}`);
        }
    } else {
        console.log('No user is currently logged in.');
        res.status(400).send('No user is currently logged in.');
    }
});





