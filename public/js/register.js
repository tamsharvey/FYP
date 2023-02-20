function register()
{
    let email = document.getElementById('inputEmail').value
    let password = document.getElementById('inputPassword').value

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
           document.cookie = "accessToken=" + user.za;
            document.cookie = "uid=" + user.uid;
	        window.location.href = "/uploading.html"
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage, errorCode);
            // ..  
        });
}
