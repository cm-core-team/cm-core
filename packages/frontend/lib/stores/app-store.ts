import { configureStore } from "@reduxjs/toolkit";

import { localMeetingsSlice } from "./local-meetings";
import { userRegistrationSlice } from "./register-user";

export const makeStore = () => {
  return configureStore({
    reducer: {
      localMeetings: localMeetingsSlice.reducer,
      userRegistration: userRegistrationSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
