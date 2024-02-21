import { createAsyncThunk } from "@reduxjs/toolkit";

import { handleThunkError } from "../errors";

import { getLocationResults } from "@/lib/find-meetings/get-location-results";
import { LocationSearchResponse } from "@/lib/types/location";

export const getLocationSearchResultsThunk = createAsyncThunk<
  LocationSearchResponse,
  string
>("locationSearch/getSearchResults", async (arg, { rejectWithValue }) => {
  try {
    return await getLocationResults(arg);
  } catch (error) {
    return rejectWithValue(handleThunkError(error));
  }
});
