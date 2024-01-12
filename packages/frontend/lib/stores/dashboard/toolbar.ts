import { createSlice } from "@reduxjs/toolkit";

import { generateTokenThunk } from "../thunks/generate-token";

import { Token } from "@/lib/types/models/token";

export interface InitialToolbarState {
  generateToken: {
    isLoading: boolean;
    didError: boolean;

    receivedToken?: Token;
  };
}

const initialState: InitialToolbarState = {
  generateToken: {
    isLoading: false,
    didError: false,
  },
};

export const dashboardToolbarSlice = createSlice({
  name: "dashboard/toolbar",
  initialState,
  reducers: {
    clearGenerateTokenState: (state) => {
      state.generateToken = initialState.generateToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateTokenThunk.pending, (state) => {
        state.generateToken.isLoading = true;
      })
      .addCase(generateTokenThunk.rejected, (state) => {
        state.generateToken.isLoading = false;
        state.generateToken.didError = true;
      })
      .addCase(generateTokenThunk.fulfilled, (state, action) => {
        state.generateToken.isLoading = false;
        state.generateToken.receivedToken = action.payload;
      });
  },
});
