import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import searchReducer from "./slices/searchSlice";
import currencyReducer from "./slices/currencySlice";
import currValueReducer from "./slices/currValueSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    currency: currencyReducer,
    currValue: currValueReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
