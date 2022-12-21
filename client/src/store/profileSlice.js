import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMe: false,
  user: {},
};
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    isMe: (state, action) => {
      // is crnt profile mine?
      state.isMe = action.payload;
    },
    user: (state, action) => {
      // user information of crnt profile
      state.user = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;
