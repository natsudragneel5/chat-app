// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaE9HO7W3Azn4xyglJt0rXjBa7icSrocU",
  authDomain: "chat-web-app-c70cf.firebaseapp.com",
  databaseURL:
    "https://chat-web-app-c70cf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-web-app-c70cf",
  storageBucket: "chat-web-app-c70cf.appspot.com",
  messagingSenderId: "1098018585536",
  appId: "1:1098018585536:web:9a9bb6fcafdbbe90132625",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const database = app.database();
