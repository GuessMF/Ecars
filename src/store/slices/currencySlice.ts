import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  currencyTerm: "RUB",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrencyTerm(state, action) {
      state.currencyTerm = action.payload;
    },
  },
});

export const {setCurrencyTerm} = currencySlice.actions;
export default currencySlice.reducer;
