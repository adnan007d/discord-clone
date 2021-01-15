import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBDUbi5-jaoPYesatFQ7PvkT6TiKr_lNkA",
  authDomain: "discord-clone-650b1.firebaseapp.com",
  projectId: "discord-clone-650b1",
  storageBucket: "discord-clone-650b1.appspot.com",
  messagingSenderId: "856746478727",
  appId: "1:856746478727:web:e65b6b58c44e215c73fc22",
});

const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth };
export { provider };
const db = firebaseApp.firestore();
export default db;
