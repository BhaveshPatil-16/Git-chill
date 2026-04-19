import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "./config";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
const linkedinProvider = new firebase.auth.OAuthProvider('linkedin.com');
const storage = firebase.storage();

export { auth, provider, githubProvider, linkedinProvider, storage };

export default db;
