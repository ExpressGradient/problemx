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
    if(firebaseUser === null) {
        return;
    }

    const usersRef = firestore.collection("users").doc(firebaseUser.uid);
    const docSnapshot = usersRef.get();

    if(!docSnapshot.exists) {
        const { displayName, email, phoneNumber, photoURL } = firebaseUser;
        const createdAt = Date.now();

        try {
            await usersRef.set({
                displayName,
                email,
                phoneNumber,
                photoURL,
                ...additionalUserInfo
            });
            console.log("User data added to Firestore");
        } catch(error) {
            console.log("Error in adding data to Firestore => ", error.message);
        }
    }
}

export default firebase;