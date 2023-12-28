import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  currentCatalogPage: 1,
};

const currentCatalogPageSlice = createSlice({
  name: "currentCatalogPage",
  initialState,
  reducers: {
    setCurrentCatalogPage(state, action) {
      state.currentCatalogPage = action.payload;
    },
  },
});

export const {setCurrentCatalogPage} = currentCatalogPageSlice.actions;
export default currentCatalogPageSlice.reducer;
