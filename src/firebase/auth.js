import './firebase.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export function SignIn(email, password, setIsLoggedIn){
    if (!email || !password) {
        console.error('Email and password are required.');
        return;
    }
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.debug("Singed in as: " + user.email);
        localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.debug("ErrorCode: " + errorCode + "\nErrorMsg: " + errorMessage);
    });
}

export function logOut(setIsLoggedIn){
    const auth = getAuth();
    signOut(auth).then(() => {
        console.debug("Signed Out");
        localStorage.clear();
        setIsLoggedIn(false);
        window.location.pathname = "/login";
    }).catch((error) => {
        console.debug("Error: Not Signed Out");
    });
}
