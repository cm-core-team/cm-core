import { createSlice } from "@reduxjs/toolkit";

import { User_WithCongregation } from "../types/compositions";

import { getCurrentUserThunk } from "./thunks/get-current-user";

interface InitialDashState {
  currentUser?: User_WithCongregation;
  isLoading: boolean;
  didError: boolean;
}

const initialState: InitialDashState = {
  isLoading: false,
  didError: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.didError = true;
      })
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      });
  },
});
