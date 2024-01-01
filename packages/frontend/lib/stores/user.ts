import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getCurrentUser } from "../auth/get-current-user";
import { User } from "../types/user";

import { handleThunkError } from "./errors";

import { toast } from "@/components/ui/use-toast";

const initialState = {
  currentUser: {},
  isLoading: true,
};

export const getCurrentUserThunk = createAsyncThunk<User, void>(
  "user/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await getCurrentUser();
      toast({
        title: "Welcome back!",
        description: "Welcome back to your dashboard :)",
        variant: "success",
      });

      return user;
    } catch (error) {
      return rejectWithValue(handleThunkError(error));
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserThunk.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      });
  },
});
