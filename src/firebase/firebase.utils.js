import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC2u0ogsbeJEwWXKfLH5anaCDbgRFFbO6M",
  authDomain: "clothing-db-ca9b6.firebaseapp.com",
  projectId: "clothing-db-ca9b6",
  storageBucket: "clothing-db-ca9b6.appspot.com",
  messagingSenderId: "120731281998",
  appId: "1:120731281998:web:707191fc9da440a12fb11f",
  measurementId: "G-NGSBHZ5SK2",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
