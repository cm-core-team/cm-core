import { createSlice } from "@reduxjs/toolkit";

import {
  LocationSearchFormData,
  LocationSearchResponse,
} from "../types/location";

import { getLocationSearchResultsThunk } from "./thunks/get-location-search-results";

export interface LocationSearchState {
  formState: Partial<LocationSearchFormData>;
  isLoading: boolean;
  errorMsg?: string;

  response?: LocationSearchResponse;
}

const initialState: LocationSearchState = {
  formState: {
    query: "",
  },
  errorMsg: "",
  isLoading: false,
};

export const locationSearchSlice = createSlice({
  name: "locationSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocationSearchResultsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLocationSearchResultsThunk.rejected, (state, action) => {
        state.errorMsg = action.payload as string;
        state.isLoading = false;
      })
      .addCase(getLocationSearchResultsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload;
      });
  },
});
