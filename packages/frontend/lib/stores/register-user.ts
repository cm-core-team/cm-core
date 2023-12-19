import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { submitUser } from "../auth/submit-user";
import { backendErrorHandle } from "../backend-error-handle";
import { RegisterUserFormData } from "../types/auth/user-form";
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

export const createUserThunk = createAsyncThunk<User, RegisterUserFormData>(
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
