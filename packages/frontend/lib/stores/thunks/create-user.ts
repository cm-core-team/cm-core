import { createAsyncThunk } from "@reduxjs/toolkit";

import { handleThunkError } from "../errors";

import { toast } from "@/components/ui/use-toast";
import { submitUser } from "@/lib/auth/submit-user";
import { RegisterUserFormData } from "@/lib/types/auth/user-form";
import { User } from "@/lib/types/models/user";

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
