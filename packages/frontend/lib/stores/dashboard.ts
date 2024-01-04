import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getCurrentUser } from "../auth/get-current-user";
import { User_WithCongregation } from "../types/compositions";
import { User } from "../types/user";

import { handleThunkError } from "./errors";

interface InitialDashState {
  currentUser?: User_WithCongregation;
  isLoading: boolean;
  didError: boolean;
}

const initialState: InitialDashState = {
  isLoading: false,
  didError: false,
};

export const getCurrentUserThunk = createAsyncThunk<
  User_WithCongregation,
  void
>("user/getCurrentUser", async (_, { rejectWithValue }) => {
  try {
    return await getCurrentUser();
  } catch (error) {
    console.log("geki");
    console.log(error);
    return rejectWithValue(handleThunkError(error));
  }
});

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
