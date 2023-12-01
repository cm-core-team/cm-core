import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { backendErrorHandle } from "../backend-error-handle";
import {
  CongregationGroups,
  groupByLocation,
} from "../congregation/group-by-coords";
import { fetchLocalMeetings } from "../find-meetings/fetch-meetings";
import { getUserLocation } from "../find-meetings/get-user-location";
import { Congregation } from "../types/congregation";

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

export interface FetchLocalMeetingsThunkArg {
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

// Thunk for asynchronously fetching local meetings.
// It dispatches actions representing the states of the API call:
// (pending, fulfilled, rejected)
// which are handled by reducers to update the state.
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

export const getUserCoordsThunk = createAsyncThunk<GeolocationCoordinates>(
  "localMeetings/getUserCoords",
  async (arg, { rejectWithValue }) => {
    try {
      return await getUserLocation();
    } catch (error) {
      return rejectWithValue(undefined);
    }
  },
);

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
      .addCase(fetchLocalMeetingsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLocalMeetingsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.localCongregations = action.payload;
      })
      .addCase(fetchLocalMeetingsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as string;
      })
      .addCase(getUserCoordsThunk.fulfilled, (state, action) => {
        state.userCoords = action.payload;
      });
  },
});
