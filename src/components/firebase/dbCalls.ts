import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "./setup";
import type { TransactionPayload } from "../redux/tranReducer";

const db = getFirestore(app);

export interface FirestoreTransaction extends TransactionPayload {
  id: string;
}

export const addTransactionToDB = async (docToSave: FirestoreTransaction) => {
  try {
    console.log("hello from firestore");
    // throw new Error("Test error from firestore");
    const fileRef = doc(db, "transactions", docToSave.id);
    await setDoc(fileRef, docToSave);
    return { success: true, id: docToSave.id };
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};
