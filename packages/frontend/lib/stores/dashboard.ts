import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getCurrentUser } from "../auth/get-current-user";
import { User_WithCongregation } from "../types/compositions";
import { User } from "../types/user";

import { handleThunkError } from "./errors";

import { toast } from "@/components/ui/use-toast";

interface InitialDashState {
  currentUser?: User_WithCongregation;
  isLoading: boolean;
}

const initialState: InitialDashState = {
  isLoading: false,
};

export const getCurrentUserThunk = createAsyncThunk<
  User_WithCongregation,
  void
>("user/getCurrentUser", async (_, { rejectWithValue }) => {
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
      })
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      });
  },
});
