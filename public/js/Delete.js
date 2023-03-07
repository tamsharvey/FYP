function DeleteUser() {
    const user = firebase.auth().currentUser;

    user
        .delete()
        .then(() => {
            // User deleted.
            console.log("User Account Deleted Successful");
        })
        .catch((error) => {
            // An error occurred
            // ...
        });
}