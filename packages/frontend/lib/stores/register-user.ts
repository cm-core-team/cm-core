import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { backendErrorHandle } from "../backend-error-handle";
import { submitUser } from "../registration/submit-user";
import { RegisterUserFormData } from "../types/registration/user-form";
import { User } from "../types/user";

export interface UserRegistrationState {
  formState: Partial<RegisterUserFormData>;
  isLoading: boolean;
  errorMsg?: string;

  responseUser?: User;
}

const initialState: UserRegistrationState = {
  formState: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    retypedPassword: "",
  },
  isLoading: false,
};

export const submitUserThunk = createAsyncThunk<User, RegisterUserFormData>(
  "userRegistration/submitUser",
  async (arg, { rejectWithValue }) => {
    try {
      return await submitUser(arg);
    } catch (error) {
      return rejectWithValue(backendErrorHandle(error));
    }
  },
);

export const userRegistrationSlice = createSlice({
  name: "userRegistration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitUserThunk.rejected, (state, action) => {
        state.errorMsg = action.payload as string;
        state.isLoading = false;
      })
      .addCase(submitUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseUser = action.payload;
      });
  },
});
