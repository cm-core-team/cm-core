import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "@/components/ui/use-toast";
import { backendErrorHandle } from "@/lib/backend-error-handle";
import { backendRoutes } from "@/lib/config";
import { requestOptions } from "@/lib/request-options";
import { GenerateTokenFormData } from "@/lib/types/dashboard";
import { Token, tokenSchema } from "@/lib/types/models/token";

type GenerateTokenThunkArgs = GenerateTokenFormData & {
  createdByUserId: number;
};

export const generateTokenThunk = createAsyncThunk<
  Token,
  GenerateTokenThunkArgs
>("dashboard/generateToken", async (args, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      backendRoutes.token.create,
      args,
      requestOptions(),
    );
    const token = tokenSchema.parse(response.data.token);

    toast({
      title: "Success",
      description: "Created token for " + token.userEmail,
      variant: "success",
    });

    return token;
  } catch (error) {
    const errorMsg = backendErrorHandle(error);
    toast({
      title: "Error",
      description: errorMsg,
      variant: "destructive",
    });
    return rejectWithValue(errorMsg);
  }
});
