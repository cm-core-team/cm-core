import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { handleThunkError } from "../errors";

import { toast } from "@/components/ui/use-toast";
import { loginUser } from "@/lib/auth/login-user";
import { LoginUserFormData } from "@/lib/types/auth/user-form";

type LoginArgs = LoginUserFormData & { router: AppRouterInstance };

export const loginUserThunk = createAsyncThunk<void, LoginArgs>(
  "userRegistration/loginUser",
  async ({ email, password, router }, { rejectWithValue }) => {
    try {
      await loginUser({ email, password });
      toast({
        title: "Success",
        description: "Logged in!",
        variant: "success",
      });
      router.replace("/dashboard");
    } catch (error) {
      return rejectWithValue(handleThunkError(error));
    }
  },
);
