import { RootState } from "./store";

export const selectReceiptUpload = (state: RootState): boolean => {
  return state.transaction.uploadedFileNames.length > 0;
};

export const selectReceiptParsed = (state: RootState) =>
  state.transaction.receiptParsed;

export const selectReceiptDataFromDB = (state: RootState) => state.transaction;
