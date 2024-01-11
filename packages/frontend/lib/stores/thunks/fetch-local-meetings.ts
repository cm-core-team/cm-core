import { createAsyncThunk } from "@reduxjs/toolkit";

import { FetchLocalMeetingsThunkArg } from "../local-meetings";

import { backendErrorHandle } from "@/lib/backend-error-handle";
import { fetchLocalMeetings } from "@/lib/find-meetings/fetch-meetings";
import { Congregation } from "@/lib/types/models/congregation";

export const fetchLocalMeetingsThunk = createAsyncThunk<
  Congregation[],
  FetchLocalMeetingsThunkArg
>("localMeetings/fetchLocalMeetings", async (arg, { rejectWithValue }) => {
  try {
    return await fetchLocalMeetings(arg.latitude, arg.longitude);
  } catch (error) {
    return rejectWithValue(backendErrorHandle(error));
  }
});
