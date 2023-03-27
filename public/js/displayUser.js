function dispUser() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            const uid = user.uid;
            const db = firebase.firestore();
            const userDataRef = db.collection("UserData").doc(uid);

            userDataRef.get().then((doc) => {
                if (doc.exists) {
                    const data = doc.data();

                    console.log(user.email);
                    console.log(user.displayName);

                    document.getElementById("userDisplayName").innerHTML = user.displayName;
                    document.getElementById("userEmail").innerHTML = user.email;
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        } else {
            // User is signed out.
            // ...
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    dispUser();
});