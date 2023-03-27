function login()
{
    const email = document.getElementById('inputEmail').value
    const password = document.getElementById('inputPassword').value

     if (!email || !password)
    {
        alert("Please fill in all the fields.");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            document.cookie = "accessToken=" + user.za;
            document.cookie = "uid=" + user.uid; //not currently using yet
            console.log("User object", user);
            // Call firebase function to save users other credentials, create another docs etc.

             window.location.href = "../SearchHome.html"
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === "auth/user-not-found") {
                const confirmCreateAccount = confirm("The email address is not linked to an account. Do you want to create an account?");
                if (confirmCreateAccount) {
                    // Redirect to create account page
                    window.location.href = "../Register.html";
                } else {
                    // Do nothing or redirect to login page
                    window.location.href = "../Login.html";
                }
            } else {
                alert("Incorrect username or password. Try again.");
            }



            console.log(errorCode, errorMessage);
        });

    // //  Checks user credentials
    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //         // User is signed in, you can retrieve user information here
    //         const uid = user.uid;
    //         const email = user.email;
    //         console.log("User is signed in with UID:", uid, "and email:", email);
    //     } else {
    //         // User is not signed in, redirect to login page
    //         // window.location.href = "login.html";
    //     }
    // });

}
