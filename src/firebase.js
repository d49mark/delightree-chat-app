import * as firebase from "firebase";

// should go in a secret file or deployment pipeline
const config = {
  apiKey: "AIzaSyDAO6zUI0kXfMnDlJ4bgpHnyJO_VAYM1ZU",
  authDomain: "chatapp-a59e5.firebaseapp.com",
  databaseURL: "https://chatapp-a59e5-default-rtdb.firebaseio.com/",
  storageBucket: "chatapp-a59e5.appspot.com",
  messagingSenderId: "967676381215",
};
// intialize if not initialized otherwise use the initialized one
if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(); // if already initialized, use that one
}
export default firebase;
