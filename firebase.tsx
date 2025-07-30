// TODO: Initialise Cloud Firestore and get a reference to the service
// Documentation: https://docs.expo.dev/guides/using-firebase/

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcyHpVVC80J4iPGu5Yyjp-aUWKu93tVPQ",
  authDomain: "dv300-class-exercise.firebaseapp.com",
  projectId: "dv300-class-exercise",
  storageBucket: "dv300-class-exercise.appspot.com", 
  messagingSenderId: "936643027240", 
  appId: "1:936643027240:web:12f0131ac6cfa0ebd0b01d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };