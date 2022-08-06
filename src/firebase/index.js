import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxLTEKN1OcgL5GdHhrHIMPyPUfNixi8ac",
  authDomain: "ientertain-60ed6.firebaseapp.com",
  projectId: "ientertain-60ed6",
  storageBucket: "ientertain-60ed6.appspot.com",
  messagingSenderId: "241740152230",
  appId: "1:241740152230:web:c9e843e6470829e8d46367",
  measurementId: "G-B65DBQJC0N",
};

initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };