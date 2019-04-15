import firebase from "firebase";

const db = firebase
  .initializeApp({
    databaseURL: "https://nusplanner.firebaseio.com/"
  })
  .database();

export default db;
