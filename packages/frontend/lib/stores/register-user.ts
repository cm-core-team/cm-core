import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RegisterUserFormData } from "../types/registration/user-form";
import { User } from "../types/user";
import { backendErrorHandle } from "../backend-error-handle";
import { submitUser } from "../registration/submit-user";

export interface UserRegistrationState {
  formState: Partial<RegisterUserFormData>;
}

const initialState: UserRegistrationState = {
  formState: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    retypedPassword: "",
  },
};

const submitUserThunk = createAsyncThunk<User, RegisterUserFormData>(
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
  reducers: {
    updateUserRegistrationState: (
      state,
      action: PayloadAction<RegisterUserFormData>,
    ) => {
      state.formState = action.payload;
    },
  },
});
