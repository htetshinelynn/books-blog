import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAKYmchjHBhIFpfMCiNZVaHQlJ197d9fco",
  authDomain: "vue-blog-system-fc4a8.firebaseapp.com",
  projectId: "vue-blog-system-fc4a8",
  storageBucket: "vue-blog-system-fc4a8.appspot.com",
  messagingSenderId: "921897948780",
  appId: "1:921897948780:web:bbe170ac6355b2909eea49"
};

// init firebase
let fb = firebase.initializeApp(firebaseConfig);

// database setup
let db=firebase.firestore();

export {db,fb};