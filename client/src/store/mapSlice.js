import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: {},
};
export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    location: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const mapActions = mapSlice.actions;
