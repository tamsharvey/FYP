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
            var user = userCredential.user;
            document.cookie = "accessToken=" + user.za;
            document.cookie = "uid=" + user.uid; //not currently using yet
            console.log("User object", user);
            // Call firebase function to save users other credentials, create another docs etc.

             window.location.href = "../SearchHome.html"
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}
