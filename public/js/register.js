function register()
{
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://us-central1-finalyearproject-837f4.cloudfunctions.net/uploaduserinfo');


    // Get the user's input from the registration form
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("inputEmail").value;
    const password1 = document.getElementById("inputPassword1").value;
    const password2 = document.getElementById("inputPassword2").value;

    // Validate the user's input
    if (!firstName || !lastName || !email || !password1 || !password2)
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

    // xhr.setRequestHeader('Content-Type', 'application/json');

    firebase.auth().createUserWithEmailAndPassword(email, password1)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            document.cookie = 'accessToken=' + user.za;
            document.cookie = 'uid=' + user.uid;
            window.location.href = '../SearchHome.html';

            const db = firebase.firestore();
            db.collection("UserData").doc(user.uid).set({
                firstName: firstName,
                lastName: lastName,
                email: email,
            })
                .then(() => {
                    console.log("User data saved to Firestore.");
                })
                .catch((error) => {
                    console.error("Error saving user data to Firestore: ", error);
                });

            // Send the request to the Cloud Function after successful registration
            // xhr.send(
            //     JSON.stringify({
            //         firstName: firstName,
            //         lastName: lastName,
            //         email: email,
            //         uid: getCookie('uid'),
            //     })
            // );
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage, errorCode);
        });

}


//     function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }
