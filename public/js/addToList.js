function addToList(bookData) {
    // // Get the user ID from your authentication system (for example, Firebase Auth)
    // const userId = getCurrentUserId();
    //
    // // Add the book data to the user's list in Firestore
    // db.collection("users").doc(userId).collection("books").add(bookData)
    //     .then((docRef) => {
    //         console.log("Book added to user's list with ID:", docRef.id);
    //     })
    //     .catch((error) => {
    //         console.error("Error adding book to user's list:", error);
    //     });

    const addToMyList = firebase.functions().httpsCallable('addToMyList');
    addToMyList({ bookData: bookData }).then(result => {
        console.log(result.data);
    }).catch(error => {
        console.error(error);
    });
}