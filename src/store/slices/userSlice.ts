import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  personName: null,
  email: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.personName = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload;
    },
    removeUser(state) {
      state.personName = null;
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
