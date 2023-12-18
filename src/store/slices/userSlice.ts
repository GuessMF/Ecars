import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  displayName: null,
  mobile: null,
  email: null,
  token: null,
  id: null as string | null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.displayName = action.payload.name;
      state.mobile = action.payload.mobile;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.displayName = null;
      state.mobile = null;
      state.email = null;
      state.token = null;
      state.id = null;
      window.location.reload();
    },
  },
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
