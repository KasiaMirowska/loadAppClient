import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import tranReducer from "./tranReducer";
import servReducer from "./servReducer";

const store = configureStore({
  reducer: {
    server: servReducer,
    transaction: tranReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  any
>;
