import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName: displayName,
        email: email,
        createdAt: createdAt,
        ...additionalInformation
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async(email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}
export const signInUserWithEmailAndPassword = async(email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => { onAuthStateChanged(auth, callback)

}