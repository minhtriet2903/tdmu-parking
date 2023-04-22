// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAxM-fzHzC6HzTEtu9gTu2nGZgTZFyQ8Cg",
//   authDomain: "tdmucoin.firebaseapp.com",
//   databaseURL:
//     "https://tdmucoin-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "tdmucoin",
//   storageBucket: "tdmucoin.appspot.com",
//   messagingSenderId: "433146562516",
//   appId: "1:433146562516:web:c991ecb5d9d31ca7337841",
// };
const firebaseConfig = {
  apiKey: "AIzaSyDcNty0MUgrm41b5V-pYGit__BZ_PHt5EA",
  authDomain: "rfidchecking.firebaseapp.com",
  databaseURL: "https://rfidchecking-default-rtdb.firebaseio.com",
  projectId: "rfidchecking",
  storageBucket: "rfidchecking.appspot.com",
  messagingSenderId: "1056325405502",
  appId: "1:1056325405502:web:10ed99994c22c63e917a6f",
  measurementId: "G-T76W6L1YQ2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
