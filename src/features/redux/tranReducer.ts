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
import {
  TransactionSavingStatus,
  TransactionType,
  type FirestoreManualTransaction,
  type FirestoreReceiptTransaction,
  type ManualTransaction,
  type ReceiptTransaction,
  type TransactionState,
} from "./types";

const initialState: TransactionState = {
  status: TransactionSavingStatus.IDLE,
  id: "",
  total: 0,
  tax: 0,
  description: "",
  merchant: "",
  items: [],
  category: "",
  date: "",
  receiptPresent: false,
  error: undefined,
  type: TransactionType.manual,
  uploadedFileNames: [],
  receiptParsed: false,
};

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

export interface Upload {
  success: boolean;
  key: any;
}

export const uploadReceiptImages = createAsyncThunk(
  "upload receipts per transaction",
  async (
    { files, receiptId }: { files: File[]; receiptId: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const uploads = await Promise.all(
        files.map((file, index) => {
          const extension = file.name.split(".").pop() || "jpg";
          const key = `${receiptId}/image_${index}.${extension}`;
          return s3FileUpload(file, key);
        })
      );

      const keys = uploads.reduce<string[]>((acc, upload) => {
        if (upload?.key) acc.push(upload.key);
        return acc;
      }, []);

      if (keys.length === 0) throw new Error("No files uploaded");

      const manifest = new Blob(
        [
          JSON.stringify(
            {
              receiptId,
              imageKeys: keys, // these are full S3 keys like 'abc123/image_0.jpg'
            },
            null,
            2
          ),
        ],
        { type: "application/json" }
      );

      const manifestFile = new File([manifest], "manifest.json", {
        type: "application/json",
      });

      await s3FileUpload(manifestFile, `${receiptId}/manifest.json`);

      await dispatch(
        setReceiptTranToState({
          total: 0,
          description: "",
          category: "",
          merchant: "",
          date: "",
          items: [],
          tax: 0,
          receiptPresent: true,
          type: TransactionType.receipt,
          uploadedFileNames: [...keys],
        })
      );
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
    setManualTranToState(state, action: PayloadAction<ManualTransaction>) {
      const { total, description, category, date, receiptPresent } =
        action.payload;
      state.type = TransactionType.manual;
      state.id = uuidv4();
      state.total = total;
      state.description = description;
      state.category = category;
      state.date = date;
      state.receiptPresent = receiptPresent;
    },
    setReceiptTranToState(state, action: PayloadAction<ReceiptTransaction>) {
      state.type = TransactionType.receipt;
      const {
        total,
        description,
        category,
        merchant,
        date,
        receiptPresent,
        items,
        tax,
        uploadedFileNames,
      } = action.payload;

      state.id = uuidv4();
      state.total = total;
      state.tax = tax;
      state.items = items;
      state.description = description;
      state.merchant = merchant;
      state.category = category;
      state.date = date;
      state.receiptPresent = receiptPresent;
      state.uploadedFileNames = uploadedFileNames;
    },
    setDBReceiptStatus(state, action: PayloadAction<boolean>) {
      state.receiptParsed = action.payload;
    },
    resetState(state) {
      state.type = TransactionType.manual;
      state.id = "";
      state.total = 0;
      state.tax = 0;
      state.items = [];
      state.description = "";
      state.merchant = "";
      state.category = "";
      state.date = "";
      state.receiptPresent = false;
      state.uploadedFileNames = [];
      state.status = TransactionSavingStatus.IDLE;
      state.error = undefined;
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

export const {
  setManualTranToState,
  setReceiptTranToState,
  setDBReceiptStatus,
  resetState,
} = transactionInfo.actions;
export default transactionInfo.reducer;

// export const saveTransaction = (
//   transaction: ReceiptTransaction | ManualTransaction
// ): AppThunk => {
//   return async (dispatch, getState) => {
//     if (!isReceiptTransactionPayload(transaction)) {
//       const { amount, description, category, date, receiptPresent, type } =
//         transaction;
//       await dispatch(
//         manualTranToState({
//           amount,
//           description,
//           category,
//           date,
//           receiptPresent,
//           type,
//         })
//       );
//       const updatedState = getState().transaction;

//       await dispatch(
//         saveTranIntoDB({
//           id: updatedState.id,
//           amount: updatedState.amount,
//           description: updatedState.description,
//           category: updatedState.category,
//           date: updatedState.date,
//           receiptPresent: updatedState.receiptPresent,
//           type: TransactionType.manual,
//         })
//       );
//     } else {
//       await dispatch(receiptTranToState(transaction)); //we should save in db AFTER processing data from the receipt in the lambda...
//       // temporary solution adding unnesesary property  of the file name to transaction and not including all the data that will available after decoding the doc
//       const updatedState = getState().transaction;
//       if (!updatedState.uploadedFileName) {
//         return;
//       }

//       await dispatch(
//         saveTranIntoDB({
//           id: updatedState.id,
//           type: TransactionType.receipt,
//           receiptPresent: updatedState.receiptPresent,
//           uploadedFileName: updatedState.uploadedFileName,
//         })
//       );
//     }
//   };
// };
