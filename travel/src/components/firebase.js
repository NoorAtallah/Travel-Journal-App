
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getStorage } from "firebase/storage"; 


const firebaseConfig = {
  apiKey: "AIzaSyDwaJzQwsobj0quKch8LnLCUN8v8D_lU8g",
  authDomain: "travel-98abd.firebaseapp.com",
  databaseURL: "https://travel-98abd-default-rtdb.firebaseio.com/",
  projectId: "travel-98abd",
  storageBucket: "travel-98abd.appspot.com",
  messagingSenderId: "267159305336",
  appId: "1:267159305336:web:fe670c5600d4096fb7c18d",
  measurementId: "G-6RXW6P6MQY"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const storage = getStorage(app); 
const auth = getAuth(app);


const createUser = createUserWithEmailAndPassword;
const sendEmailLink = sendEmailVerification;
const loginFirebase = signInWithEmailAndPassword;



const saveUserToFirebase = async (user, name, password) => {
    const userRef = ref(db, `users/${user.uid}`);
    await set(userRef, {
      uid: user.uid,
      email: user.email,
      name: name,       // Storing the name
      password: password,
      displayName: user.displayName,
  });
};


export {
  db,
  auth,
  storage,
  signInWithPopup,
  createUser,
  sendEmailLink,
  loginFirebase,
  GoogleAuthProvider,
  analytics,
  firebaseConfig,
  saveUserToFirebase,
  ref, set 
};
