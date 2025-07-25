import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import {
  setDBReceiptStatus,
  setReceiptTranToState,
} from "../redux/tranReducer";
import { app } from "../firebase/setup";
import { isEmpty } from "lodash";
import { TransactionType } from "../redux/types";

const db = getFirestore(app);

export const useCheckReceiptStatus = (receiptId: string) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (isEmpty(receiptId)) return;

    const receiptRef = doc(db, "receiptTransactions", receiptId);

    const unsubscribe = onSnapshot(receiptRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        dispatch(setDBReceiptStatus(true));
        const {
          total,
          description,
          merchant,
          category,
          date,
          receiptPresent,
          items,
          tax,
          imageUrls,
        } = data;
        dispatch(
          setReceiptTranToState({
            total,
            description,
            merchant,
            category,
            date,
            items,
            tax,
            receiptPresent,
            type: TransactionType.receipt,
            uploadedFileNames: imageUrls,
          })
        );
      }
    });

    return () => unsubscribe();
  }, [receiptId, dispatch]);
};
