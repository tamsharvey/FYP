// function addDataToFirestore(data) {
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             // User is signed in.
//             const uid = user.uid;
//             const db = firebase.firestore();
//             const userDataRef = db.collection("UserData").doc(uid);
//
//             userDataRef.get().then((doc) => {
//                 if (doc.exists) {
//                     document.getElementById("userDisplayName").value = doc.data().displayName;
//                     document.getElementById("userEmail").value = doc.data().email;
//                 } else {
//                     console.log("No such document!");
//                 }
//             }).catch((error) => {
//                 console.log("Error getting document:", error);
//             });
//
//             // Call the function to add data to Firestore
//             db.collection("Movies").add(data)
//                 .then(docRef => {
//                     console.log("Movie added with ID: ", docRef.id);
//                 })
//                 .catch(error => {
//                     console.error("Error adding movie: ", error);
//                 });
//
//         } else {
//             // User is signed out.
//             // ...
//         }
//     });
// // }
//
//
// import firebase from 'firebase/app';
// import 'firebase/firestore';
//
// const db = firebase.firestore();
//
// export async function addDataToFirestore(movieData, userId) {
//     try {
//         const docRef = await db.collection("users").doc(userId).collection("movies").add(movieData);
//         console.log("Movie added with ID: ", docRef.id);
//     } catch (error) {
//         console.error("Error adding movie: ", error);
//     }
// }
// function test(){
//     console.log("testing call");
//     alert("testing call");
// }
//
