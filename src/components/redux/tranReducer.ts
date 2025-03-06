import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { AppThunk } from "./store";
import { addTransactionToDB } from "../firebase/dbCalls";
import { s3FileUpload } from "../apiCalls";
import _ from "lodash";

export enum TransactionSavingStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  FAILED = "FAILED",
}

interface TransactionState {
  status: TransactionSavingStatus;
  id: string;
  amount: string;
  description: string;
  category: string;
  date: string;
  receiptPresent: boolean;
  error: { code: string; message: string } | undefined;
  type: TransactionType;
}

export enum TransactionType {
  "manual" = "manual",
  "receipt" = "receipt",
}
const initialState: TransactionState = {
  status: TransactionSavingStatus.IDLE,
  id: "",
  amount: "",
  description: "",
  category: "",
  date: "",
  receiptPresent: false,
  error: undefined,
  type: TransactionType.manual,
};

export interface ManualTransaction {
  amount: string;
  description: string;
  category: string;
  date: string;
  receiptPresent: boolean;
  type: TransactionType.manual;
}

export interface ReceiptTransaction {
  receiptPresent: boolean;
  type: TransactionType.receipt;
}

export interface TransactionPayload {
  amount: string;
  description: string;
  category: string;
  date: string;
  receiptPresent: boolean;
  type: TransactionType;
}

export interface FirestoreManualTransaction extends ManualTransaction {
  id: string;
}

export interface FirestoreReceiptTransaction extends ReceiptTransaction {
  id: string;
}

export function isReceiptTransactionPayload(
  tran: ManualTransaction | ReceiptTransaction
): tran is ReceiptTransaction {
  return tran.type == TransactionType.receipt;
}

export function isReceiptFirestoreTransaction(
  tran: FirestoreManualTransaction | FirestoreReceiptTransaction
): tran is FirestoreReceiptTransaction {
  return tran.type == TransactionType.receipt && !_.isUndefined(tran.id);
}

export const saveTranIntoDB = createAsyncThunk(
  "manualTransaction/savedInDb",
  async (
    transactionInfo: FirestoreManualTransaction | FirestoreReceiptTransaction,
    { rejectWithValue }
  ) => {
    console.log("transactionInfo", transactionInfo);
    try {
      //add to firestore
      const firestoreRespone = await addTransactionToDB(transactionInfo);
      return firestoreRespone;
    } catch (e: any) {
      return rejectWithValue(
        e instanceof Error ? e.message : "Unknown error occurred"
      );
    }
  }
);

export const uploadFile = createAsyncThunk(
  "upload receipts per transaction",
  async (file: any, { rejectWithValue }) => {
    console.log("file", file);

    try {
      const response = await s3FileUpload(file);
      console.log("aws res", response);
      return response;
    } catch (e: any) {
      return rejectWithValue(
        e instanceof Error ? e.message : "Unknown error occurred"
      );
    }
  }
);
export const transactionInfo = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    manualTranToState(state, action: PayloadAction<ManualTransaction>) {
      const { amount, description, category, date, receiptPresent } =
        action.payload;

      state.id = uuidv4();
      state.amount = amount;
      state.description = description;
      state.category = category;
      state.date = date;
      state.receiptPresent = receiptPresent;
    },
    receiptTranToState(state, action: PayloadAction<ReceiptTransaction>) {
      state.receiptPresent = true;
      state.id = uuidv4();
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(saveTranIntoDB.pending, (state) => {
        state.status = TransactionSavingStatus.LOADING;
      })
      .addCase(saveTranIntoDB.fulfilled, (state, action) => {
        console.log("AAA", action.payload.success);
        state.status = TransactionSavingStatus.IDLE;
      })
      .addCase(saveTranIntoDB.rejected, (state, action) => {
        console.log("ERROR", action.payload);
        state.status = TransactionSavingStatus.FAILED;
        state.error = action.payload
          ? { code: "500", message: String(action.payload) }
          : undefined;
      });
  },
});

export const { manualTranToState, receiptTranToState } =
  transactionInfo.actions;
export default transactionInfo.reducer;

export const saveTransaction = (
  transaction: ReceiptTransaction | ManualTransaction
): AppThunk => {
  return async (dispatch, getState) => {
    if (!isReceiptTransactionPayload(transaction)) {
      const { amount, description, category, date, receiptPresent, type } =
        transaction;
      await dispatch(
        manualTranToState({
          amount,
          description,
          category,
          date,
          receiptPresent,
          type,
        })
      );
      const updatedState = getState().transaction;

      await dispatch(
        saveTranIntoDB({
          id: updatedState.id,
          amount: updatedState.amount,
          description: updatedState.description,
          category: updatedState.category,
          date: updatedState.date,
          receiptPresent: updatedState.receiptPresent,
          type: TransactionType.manual,
        })
      );
    } else {
      await dispatch(receiptTranToState(transaction));
      const updatedState = getState().transaction;
      await dispatch(
        saveTranIntoDB({
          id: updatedState.id,
          type: TransactionType.receipt,
          receiptPresent: updatedState.receiptPresent,
        })
      );
    }
  };
};
