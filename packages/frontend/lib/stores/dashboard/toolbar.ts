import { createSlice } from "@reduxjs/toolkit";

import { generateTokenThunk } from "../thunks/generate-token";

import { Token } from "@/lib/types/models/token";

interface InitialToolbarState {
  isLoading: boolean;
  didError: boolean;

  receivedToken?: Token;
}

const initialState: InitialToolbarState = {
  isLoading: false,
  didError: false,
};

export const dashboardToolbarSlice = createSlice({
  name: "dashboard/toolbar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateTokenThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(generateTokenThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.didError = true;
      })
      .addCase(generateTokenThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.receivedToken = action.payload;
      });
  },
});
