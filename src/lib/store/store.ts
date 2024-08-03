import { configureStore } from "@reduxjs/toolkit";
import betReducers from "./features/bet/betSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      bet: betReducers
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
