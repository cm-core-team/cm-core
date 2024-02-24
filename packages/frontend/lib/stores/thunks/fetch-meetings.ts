import { createAsyncThunk } from "@reduxjs/toolkit";

import { FetchMeetingsThunkArg } from "../local-meetings";

import { backendErrorHandle } from "@/lib/backend-error-handle";
import { fetchMeetings } from "@/lib/find-meetings/fetch-meetings";
import { Congregation } from "@/lib/types/models/congregation";

export const fetchMeetingsThunk = createAsyncThunk<
  Congregation[],
  FetchMeetingsThunkArg
>("meetings/fetchMeetings", async (arg, { rejectWithValue }) => {
  try {
    return await fetchMeetings(arg.latitude, arg.longitude);
  } catch (error) {
    return rejectWithValue(backendErrorHandle(error));
  }
});
