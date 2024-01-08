import { createAsyncThunk } from "@reduxjs/toolkit";

import { handleThunkError } from "../errors";

import { getCurrentUser } from "@/lib/auth/get-current-user";
import { User_WithCongregation } from "@/lib/types/compositions";

export const getCurrentUserThunk = createAsyncThunk<
  User_WithCongregation,
  void
>("user/getCurrentUser", async (_, { rejectWithValue }) => {
  try {
    return await getCurrentUser();
  } catch (error) {
    return rejectWithValue(handleThunkError(error));
  }
});
