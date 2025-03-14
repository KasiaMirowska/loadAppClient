import _ from "lodash";

export enum TransactionSavingStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  FAILED = "FAILED",
}

export interface TransactionState {
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
