function logout()
{
firebase.auth().signOut().then(() =>
{
console.log("Sign out successful");
   // Reset cookie
   document.cookie = "accessToken= ";
   // Redirect to the home page
   window.location.href = "/index.html"
   // Sign-out successful.
   }).catch((error) =>
   {
   // An error happened.
   });
 }
