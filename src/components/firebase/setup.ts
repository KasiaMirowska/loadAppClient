import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-FbTPuw1U_Q5BU5u3M0TvkpiViGAq-eA",
  authDomain: "loadingapp-5a829.firebaseapp.com",
  projectId: "loadingapp-5a829",
  storageBucket: "loadingapp-5a829.firebasestorage.app",
  messagingSenderId: "52589291395",
  appId: "1:52589291395:web:ac978b417f2d40598638b6",
};

export const app = initializeApp(firebaseConfig);

// export const testDocInput = async () => {
//   try {
//     const docRef = await addDoc(collection(db, "transactions"), {
//       id: "testDoc01",
//       amount: "19.95",
//       description: "t-shirt",
//       category: "clothes",
//       date: "02/27/2025",
//       receiptPresent: false,
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.log("Error adding element", e);
//   }
// };
