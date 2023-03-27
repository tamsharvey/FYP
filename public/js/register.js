function register() {
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://us-central1-finalyearproject-837f4.cloudfunctions.net/uploaduserinfo');


    // Get the user's input from the registration form
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("inputEmail").value;
    const password1 = document.getElementById("inputPassword1").value;
    const password2 = document.getElementById("inputPassword2").value;

    const displayName = `${firstName} ${lastName}`;

    // Validate the user's input
    if (!firstName || !lastName || !email || !password1 || !password2) {
        alert("Please fill in all the fields.");
        return;
    }

    if (password1 !== password2) {
        alert("Passwords must match.");
        return;
    }

    if (password1.length < 6 || password2.length < 6) {
        alert("Passwords must be at least 6 characters.");
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password1)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            user.updateProfile({
                displayName: displayName
            }).then(() => {
                setTimeout(() => {
                    // console.log(user.displayName); // check if the display name was updated
                    document.cookie = 'accessToken=' + user.za;
                    document.cookie = 'uid=' + user.uid;

                    window.location.href = '../SearchHome.html';

                }, 1000); // wait for 1 second before accessing the updated user object
            });

            // document.cookie = 'accessToken=' + user.za;
            // document.cookie = 'uid=' + user.uid;
            // // window.location.href = '../SearchHome.html';
            // console.log("Done");
            // console.log(user.displayName);


        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === "auth/email-already-in-use") {
                const confirmAccount = confirm("The email address is already linked to an account. Do you want to login?");
                if (confirmAccount) {
                    // Redirect to create account page
                    window.location.href = "../Login.html";
                } else {
                    // Do nothing or redirect to login page
                    // window.location.href = "../Login.html";
                }
            } else if (errorCode === "auth/invalid-email") {
                alert("Invalid Email.");
            } else {
            }

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
