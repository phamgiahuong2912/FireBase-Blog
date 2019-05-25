import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-t8V6OAibzsfBqg63bFHUHnmN5tnOrkc",
  authDomain: "blog-10ea7.firebaseapp.com",
  databaseURL: "https://blog-10ea7.firebaseio.com",
  projectId: "blog-10ea7",
  storageBucket: "blog-10ea7.appspot.com",
  messagingSenderId: "344754814714",
  appId: "1:344754814714:web:d9192dee0723ba3a",
};
firebase.initializeApp(firebaseConfig);
let firebaseDb = firebase.database();
export { firebase };
