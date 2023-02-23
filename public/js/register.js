function register()
{
    // Get the user's input from the registration form
    const email = document.getElementById("inputEmail").value;
    const password1 = document.getElementById("inputPassword1").value;
    const password2 = document.getElementById("inputPassword2").value;

    // Validate the user's input
    if (!email || !password1 || !password2)
    {
        alert("Please fill in all the fields.");
        return;
    }

    if (password1 !== password2)
    {
        alert("Passwords must match.");
        return;
    }

    if (password1.length < 6 || password2.length < 6)
    {
        alert("Passwords must be at least 6 characters.");
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password1)
        .then((userCredential) =>
        {
            // Signed in
            var user = userCredential.user;
           document.cookie = "accessToken=" + user.za;
            document.cookie = "uid=" + user.uid;
	        window.location.href = "./MovieSearch.html"
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage, errorCode);
            // ..
        });
}
