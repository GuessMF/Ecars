import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  displayName: null,
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
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.displayName = null;
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
// import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// interface UserState {
//   displayName: string | null;
//   email: string | null;
//   token: string | null;
//   id: string | null;
// }

// const initialState: UserState = {
//   displayName: null,
//   email: null,
//   token: null,
//   id: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<UserState>) {
//       state.displayName = action.payload.displayName;
//       state.email = action.payload.email;
//       state.token = action.payload.token;
//       state.id = action.payload.id;
//     },
//     removeUser(state) {
//       state.displayName = null;
//       state.email = null;
//       state.token = null;
//       state.id = null;
//     },
//   },
// });

// export const {setUser, removeUser} = userSlice.actions;
// export default userSlice.reducer;
