import { configureStore } from "@reduxjs/toolkit";
import betReducers from "./features/bet/betSlice";
import sportsReducer from "./features/sports/sportsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      bet: betReducers,
      sports: sportsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
