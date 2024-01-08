import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "@/components/ui/use-toast";
import { backendErrorHandle } from "@/lib/backend-error-handle";
import { getUserLocation } from "@/lib/find-meetings/get-user-location";

export const getUserCoordsThunk = createAsyncThunk<GeolocationCoordinates>(
  "localMeetings/getUserCoords",
  async (arg, { rejectWithValue }) => {
    try {
      return await getUserLocation();
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
