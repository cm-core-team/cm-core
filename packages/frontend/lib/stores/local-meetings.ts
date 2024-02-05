import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  CongregationGroups,
  groupByLocation,
} from "../congregation/group-by-coords";
import { Congregation } from "../types/models/congregation";

import { fetchMeetingsThunk } from "./thunks/fetch-meetings";
import { getUserCoordsThunk } from "./thunks/get-user-coords";

export interface LocalMeetingsState {
  localCongregations: Congregation[];
  isLoading: boolean;
  selectedCongregation?: Congregation;
  errorMsg: string;
  userCoords?: GeolocationCoordinates;

  // Some congregations have the same location
  // This is a way to track which area specifically.
  groupedCongregationsByLocation: CongregationGroups;
  displayCongregations: Congregation[];
}

export interface FetchMeetingsThunkArg {
  latitude: string;
  longitude: string;
}

const initialState: LocalMeetingsState = {
  localCongregations: [],
  isLoading: false,
  errorMsg: "",
  displayCongregations: [],
  groupedCongregationsByLocation: {},
};

// A slice (or part) of our state (this is to do with our Local Meetings)
export const localMeetingsSlice = createSlice({
  name: "localMeetings",
  initialState,
  reducers: {
    setSelectedCongregation: (
      state,
      action: PayloadAction<Congregation | undefined>,
    ) => {
      state.selectedCongregation = action.payload;
    },
    regroupCongregations: (state, action: PayloadAction<Congregation[]>) => {
      state.groupedCongregationsByLocation = groupByLocation(action.payload);
    },
    setDisplayCongregations: (
      state,
      actions: PayloadAction<Congregation[]>,
    ) => {
      state.displayCongregations = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetingsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMeetingsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.localCongregations = action.payload;
      })
      .addCase(fetchMeetingsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as string;
      })
      .addCase(getUserCoordsThunk.fulfilled, (state, action) => {
        state.userCoords = action.payload;
      })
      .addCase(getUserCoordsThunk.rejected, (state, action) => {
        state.errorMsg = action.payload as string;
      });
  },
});
