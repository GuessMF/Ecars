import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import searchReducer from "./slices/searchSlice";
import currencyReducer from "./slices/currencySlice";
import currValueReducer from "./slices/currValueSlice";
import currentCcatalogPageReducer from "./slices/currentCatalogPageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    currency: currencyReducer,
    currValue: currValueReducer,
    currentCatalogPage: currentCcatalogPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
