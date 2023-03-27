function changePassword() {
    const user = firebase.auth().currentUser;
    const oldPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword1").value;
    const confirmPassword = document.getElementById("newPassword2").value;

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
        alert("New password and confirm password must match.");
        return;
    }

    // Reauthenticate the user with their old password
    // Authenticate user with their current email and password
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
    user.reauthenticateWithCredential(credential)
        .then(() => {
            // Authentication successful, update password
            user.updatePassword(newPassword)
                .then(() => {
                    console.log("Password updated successfully!");
                    alert("Password updated successfully! Please log in with new password.");
                    window.location.href = "../Login.html";
                })
                .catch((error) => {
                    console.error("Error updating password:", error);
                    alert("Error updating password.");
                    return;
                });
        })
        .catch((error) => {
            console.error("Error authenticating user:", error);
            alert("Incorrect old password.");
            return;
        });
}


