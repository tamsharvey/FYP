function disp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            const uid = user.uid;
            const db = firebase.firestore();
            const userDataRef = db.collection("UserData").doc(uid);

            userDataRef
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        // document.getElementById("userDisplayName").innerHTML = data.displayName;
                        // document.getElementById("userEmail").innerHTML = data.email;
                        document.getElementById("newDisplayName").value = user.displayName;
                        document.getElementById("newEmail").value = user.email;
                    } else {
                        console.log("No such document!");
                    }
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                });
        } else {
            // User is signed out.
            // ...
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    disp();
});

function update() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            const uid = user.uid;
            const db = firebase.firestore();
            const userDataRef = db.collection("UserData").doc(uid);

            const displayNameInput = document.getElementById("newDisplayName");
            const emailInput = document.getElementById("newEmail");

            if (displayNameInput.value == '')
            {
                displayNameInput.value = user.displayName;
            }
            else if (emailInput.value == '')
            {
                emailInput.value = user.email;
            }

            const displayName = displayNameInput.value;
            const email = emailInput.value;

            user.updateProfile({
                displayName: displayName
            }).then(() => {
                // Update the email if it has been changed
                if (email !== user.email) {
                    user.updateEmail(email).then(() => {
                        // Update the user data in Firestore
                        return userDataRef.update({
                            displayName: displayName,
                            Email: email
                        });
                    }).then(() => {
                        // Updating email
                        alert("User profile updated successfully!");
                        console.log("User profile updated successfully! 1");
                        window.location.href = '../UserPage.html';
                    }).catch((error) => {
                        console.error("Error updating user email1:", error);
                    });
                } else {
                    // Update the user data in Firestore
                    return userDataRef.update({
                        displayName: displayName,
                        Email: email
                    }).then(() => {
                        // Updating display name
                        console.log("User profile updated successfully! 2");
                        window.location.href = '../UserPage.html';

                    }).catch((error) => {
                        console.error("Error updating user profile2:", error);
                        alert("Error updating user profile1.");
                        return;
                    });
                }
            }).catch((error) => {
                console.error("Error updating user profile3:", error);
                alert("Error updating user profile2.");
                return;
            });
        }
    })
}

function cancel() {
    window.location.href = "./UserPage.html";
}
