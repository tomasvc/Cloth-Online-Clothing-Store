// import firebase from 'firebase'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZiDP7YVBUXtwPfr0i_b0FQnIL3e5nmGY",
  authDomain: "clothing-store-e17ce.firebaseapp.com",
  projectId: "clothing-store-e17ce",
  storageBucket: "clothing-store-e17ce.appspot.com",
  messagingSenderId: "377376276086",
  appId: "1:377376276086:web:cfc61b8164f55e45452957",
  measurementId: "G-MBNT92V8BT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

const auth = getAuth();
const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  console.log(userSnapshot);
};

const getCategories = async () => {
  const docRef = doc(db, "categories", "men");
  const querySnapshot = await getDoc(docRef);

  if (querySnapshot.exists()) {
    return querySnapshot.data();
  } else {
    console.log("no such document");
  }
};

export {
  app,
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  getCategories,
};
