import {
  doc,
  getFirestore,
  setDoc,
  type DocumentReference,
} from "firebase/firestore";
import { app } from "./setup";
import {} from "../redux/tranReducer";
import {
  isReceiptFirestoreTransaction,
  type FirestoreManualTransaction,
  type FirestoreReceiptTransaction,
} from "../redux/types";

const db = getFirestore(app);

export const addTransactionToDB = async (
  docToSave: FirestoreManualTransaction | FirestoreReceiptTransaction
) => {
  if (!docToSave || !("id" in docToSave)) {
    throw new Error("Invalid document: Missing required ID");
  }

  let fileRef: DocumentReference; // Explicitly define fileRef's type

  if (isReceiptFirestoreTransaction(docToSave)) {
    fileRef = doc(db, "receiptTransactions", docToSave.id);
  } else {
    fileRef = doc(db, "manualTransactions", docToSave.id);
  }

  try {
    await setDoc(fileRef, docToSave);
    return { success: true, id: docToSave.id };
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};
