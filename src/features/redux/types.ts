import _ from "lodash";

export enum TransactionSavingStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  FAILED = "FAILED",
}

export interface TransactionState {
  status: TransactionSavingStatus;
  id: string;
  total: number;
  tax: number;
  merchant: string;
  description: string;
  category: string;
  date: string;
  receiptPresent: boolean;
  error: { code: string; message: string } | undefined;
  type: TransactionType;
  uploadedFileNames: string[];
  receiptParsed: boolean;
  items: TranItem[];
}

export enum TransactionType {
  "manual" = "manual",
  "receipt" = "receipt",
}

export interface ManualTransaction {
  total: number;
  description: string;
  category: string;
  date: string;
  receiptPresent: boolean;
  type: TransactionType;
}

export interface TranItem {
  name: string;
  quantity: number;
  price: number;
}

export interface ReceiptTransaction extends ManualTransaction {
  total: number;
  items: TranItem[];
  merchant: string;
  tax: number;
  receiptPresent: boolean;
  type: TransactionType;
  uploadedFileNames: string[];
}

export interface TransactionPayload {
  amount: number;
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
  uploadedFileNames: string[];
}

export function isReceiptFirestoreTransaction(
  tran: FirestoreManualTransaction | FirestoreReceiptTransaction
): tran is FirestoreReceiptTransaction {
  return tran.type == TransactionType.receipt && !_.isUndefined(tran.id);
}

export enum ServerType {
  express = "EXPRESS",
  serverlessAWS = "SERVERLESS_AWS",
  nonePicked = "NONE",
}

export interface ServerState {
  activeServer: ServerType;
}
