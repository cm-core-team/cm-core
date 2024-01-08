import { createSlice } from "@reduxjs/toolkit";

import { RegisterUserFormData } from "../types/auth/user-form";
import { User } from "../types/user";

import { createUserThunk } from "./thunks/create-user";

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

export const userRegistrationSlice = createSlice({
  name: "userRegistration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.errorMsg = action.payload as string;
        state.isLoading = false;
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseUser = action.payload;
      });
  },
});
