import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCdsgf1bCmTuUqZAH2lWN7Ok_lpVobUfwY",
  authDomain: "clothing-db-48b67.firebaseapp.com",
  projectId: "clothing-db-48b67",
  storageBucket: "clothing-db-48b67.appspot.com",
  messagingSenderId: "1053815571779",
  appId: "1:1053815571779:web:bdd2cda0659f1692d31bf6",
  measurementId: "G-NGFZ3E9W7R",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName: displayName,
        email: email,
        createdAt: createdAt,
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }
  return userDocRef;
};
