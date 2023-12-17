import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { backendErrorHandle } from "../backend-error-handle";
import { submitUser } from "../registration/submit-user";
import { RegisterUserFormData } from "../types/registration/user-form";
import { User } from "../types/user";

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

export const submitUserThunk = createAsyncThunk<User, RegisterUserFormData>(
  "userRegistration/submitUser",
  async (arg, { rejectWithValue }) => {
    try {
      const user = await submitUser(arg);
      toast({
        title: "Success",
        description: "Created user",
        variant: "success",
      });

      return user;
    } catch (error) {
      const errorMsg = backendErrorHandle(error);
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
      return rejectWithValue(errorMsg);
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
