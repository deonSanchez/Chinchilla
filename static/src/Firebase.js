
import * as firebase from 'firebase';

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBZkVWzrWS2D9tUukZq8J6zB3HjMjioAKY",
    authDomain: "chinchilla-33947.firebaseapp.com",
    databaseURL: "https://chinchilla-33947.firebaseio.com",
    projectId: "chinchilla-33947",
    storageBucket: "chinchilla-33947.appspot.com",
    messagingSenderId: "508923905804"
  };
  firebase.initializeApp(config);

  export const database = firebase.database().ref('post/');
  export const auth = firebase.auth();
  export const googleProvider = new firebase.auth.GoogleAuthProvider();
