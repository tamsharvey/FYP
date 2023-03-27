function addDataToFirestore() {
    // Get the current user
    const user = firebase.auth().currentUser;
    if (user) {
        // Get the user's ID
        const userId = user.uid;

        // Get a reference to the Firestore collection
        const db = firebase.firestore();
        const userDataRef = db.collection("UserData");

        // Get the data you want to add
        const data = {
            field1: "value1",
            field2: "value2",
            userId: userId
        };

        // Add the data to the Firestore collection
        userDataRef.add(data)
            .then(() => {
                console.log("Data added to Firestore!");
            })
            .catch((error) => {
                console.error("Error adding data to Firestore: ", error);
            });
    } else {
        console.error("User not logged in.");
    }
}
