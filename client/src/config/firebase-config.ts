// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    // apiKey: import.meta.env.apiKey,
    // authDomain: import.meta.env.authDomain,
    // projectId: import.meta.env.projectId,
    // storageBucket: import.meta.env.storageBucket,
    // messagingSenderId: import.meta.env.messagingSenderId,
    // appId: import.meta.env.appId,
    // measurementId: import.meta.env.measurementI
    
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
    prompt: "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
