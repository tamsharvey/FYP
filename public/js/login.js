function login()
{
    let email = document.getElementById('inputEmail').value
    let password = document.getElementById('inputPassword').value

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            document.cookie = "accessToken=" + user.za;
           document.cookie = "uid=" + user.uid; //not currently using yet
            console.log("User object", user);
            // Call firebase function to save users other credentials, create another docs etc.

            window.location.href = "/MovieSearch.html"
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}
