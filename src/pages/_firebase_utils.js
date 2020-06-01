import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAQk9xgwJe9m_LRNuf14Po_ThuHCxzs6gs",
    authDomain: "problemx-hacknu.firebaseapp.com",
    databaseURL: "https://problemx-hacknu.firebaseio.com",
    projectId: "problemx-hacknu",
    storageBucket: "problemx-hacknu.appspot.com",
    messagingSenderId: "1080536649874",
    appId: "1:1080536649874:web:f0b7459f273104f140964b",
    measurementId: "G-7V1RQYQPH3"
}

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({"prompt": "select_account"});

export const createUserRecord = async (firebaseUser, additionalUserInfo) => {
    if (firebaseUser === null) {
        return;
    }

    const usersRef = firestore.collection("users").doc(firebaseUser.uid);
    const docSnapshot = usersRef.get();

    if (!docSnapshot.exists) {
        const {displayName, email, phoneNumber, photoURL} = firebaseUser;
        const createdAt = Date.now().toLocaleString();

        try {
            await usersRef.set({
                displayName,
                email,
                phoneNumber,
                photoURL,
                createdAt,
                "problems": [],
                ...additionalUserInfo
            });
            console.log("User data added to Firestore");
        } catch (error) {
            console.log("Error in adding data to Firestore => ", error.message);
        }
    }
}

export const createFirestoreProblem = async (title, description, categories, severity, creator, additionalProblemData) => {
    const problemsRef = firestore.collection("problems").doc(title);
    const docSnapshot = problemsRef.get();

    if (!docSnapshot.exists) {
        const createdAt = Date.now().toLocaleString();

        try {
            await problemsRef.set({
                title,
                description,
                severity,
                creator,
                categories,
                createdAt,
                ...additionalProblemData
            });
            console.log("Problem created")
        } catch (error) {
            console.log("Error in creating problem => ", error.message);
        }

        return true;
    } else {
        return false;
    }
}

export const createUserProblem = async (creator, title, severity) => {
    const usersRef = firestore.collection("users").doc(creator);
    try {
        await usersRef.update({
            "problems": firebase.firestore.FieldValue.arrayUnion({title, severity})
        });
        console.log("User problem created");
    } catch (error) {
        console.log("Error in creating user problem => ", error.message);
    }
}

export default firebase;