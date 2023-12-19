import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loginUser } from "../auth/login-user";
import { submitUser } from "../auth/submit-user";
import { backendErrorHandle } from "../backend-error-handle";
import {
  LoginUserFormData,
  RegisterUserFormData,
} from "../types/auth/user-form";
import { User } from "../types/user";

import { handleThunkError } from "./errors";

import { toast } from "@/components/ui/use-toast";

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

export const createUserThunk = createAsyncThunk<User, RegisterUserFormData>(
  "userRegistration/submitUser",
  async (formData, { rejectWithValue }) => {
    try {
      const user = await submitUser(formData);
      toast({
        title: "Success",
        description: "Created user",
        variant: "success",
      });

      return user;
    } catch (error) {
      return rejectWithValue(handleThunkError(error));
    }
  },
);

export const loginUserThunk = createAsyncThunk<void, LoginUserFormData>(
  "userRegistration/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      await loginUser(formData);
      toast({
        title: "Success",
        description: "Loggined in!",
        variant: "success",
      });
    } catch (error) {
      return rejectWithValue(handleThunkError(error));
    }
  },
);

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
