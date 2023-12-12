import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
