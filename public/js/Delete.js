function confirmDeleteUser() {
    if (window.confirm("Are you sure you want to delete your account?")) {
        deleteUser();
    }
}

function deleteUser() {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const userDataRef = db.collection("UserData").doc(user.uid);

    userDataRef.delete().then(() => {
        user.delete().then(() => {
            // User deleted.
            console.log("User Account Deleted Successfully");
            // Redirect to index page
            window.location.href = "index.html";
        }).catch((error) => {
            // An error occurred
            console.error(error);
        });
    }).catch((error) => {
        // An error occurred
        console.error(error);
    });
}




