import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  usdValue: 0,
  eurValue: 0,
};

const currValueSlice = createSlice({
  name: "currencyValue",
  initialState,
  reducers: {
    setCurrValue(state, action) {
      state.usdValue = action.payload.usdValue;
      state.eurValue = action.payload.eurValue;
    },
  },
});

export const {setCurrValue} = currValueSlice.actions;
export default currValueSlice.reducer;
