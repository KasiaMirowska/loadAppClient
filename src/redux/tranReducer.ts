import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { AppThunk } from "./store";
import { apiCall } from "../apiCalls";

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
};

interface TransactionPayload {
  amount: string;
  description: string;
  category: string;
  date: string;
  receiptPresent: boolean;
}

export const saveTranIntoDB = createAsyncThunk(
  "transaction/savedInDb",
  async (transactionInfo: TransactionPayload, { rejectWithValue }) => {
    console.log("transactionInfo", transactionInfo);
    try {
      const response = await apiCall();
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
    transactionToState(state, action: PayloadAction<TransactionPayload>) {
      const { amount, description, category, date, receiptPresent } =
        action.payload;
      console.log("HERERE IN REDUCER");
      state.id = uuidv4();
      state.amount = amount;
      state.description = description;
      state.category = category;
      state.date = date;
      state.receiptPresent = receiptPresent;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(saveTranIntoDB.pending, (state) => {
        state.status = TransactionSavingStatus.LOADING;
      })
      .addCase(saveTranIntoDB.fulfilled, (state, action) => {
        console.log("AAA", action.payload);
        state.status = TransactionSavingStatus.IDLE;
      })
      .addCase(saveTranIntoDB.rejected, (state, action) => {
        console.log("ERRPR", action.payload);
        state.status = TransactionSavingStatus.FAILED;
        state.error = action.payload
          ? { code: "500", message: String(action.payload) }
          : undefined;
      });
  },
});

export const { transactionToState } = transactionInfo.actions;
export default transactionInfo.reducer;

export const saveTransaction = ({
  amount,
  description,
  category,
  date,
  receiptPresent,
}: TransactionPayload): AppThunk => {
  return async (dispatch, getState) => {
    await dispatch(
      transactionToState({
        amount,
        description,
        category,
        date,
        receiptPresent,
      })
    );
    const updatedState = getState().transaction;

    await dispatch(
      saveTranIntoDB({
        amount: updatedState.amount,
        description: updatedState.description,
        category: updatedState.category,
        date: updatedState.date,
        receiptPresent: updatedState.receiptPresent,
      })
    );
  };
};
