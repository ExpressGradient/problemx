import firebase from "firebase/app";
import "firebase/auth";
import "firebase/user";

const firebaseConfig = {
    apiKey: "AIzaSyAQk9xgwJe9m_LRNuf14Po_ThuHCxzs6gs",
    authDomain: "problemx-hacknu.firebaseapp.com",
    databaseURL: "https://problemx-hacknu.firebaseio.com",
    projectId: "problemx-hacknu",
    storageBucket: "problemx-hacknu.appspot.com",
    messagingSenderId: "1080536649874",
    appId: "1:1080536649874:web:f0b7459f273104f140964b",
    measurementId: "G-7V1RQYQPH3"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({"prompt": "select_account"});

export default firebase;