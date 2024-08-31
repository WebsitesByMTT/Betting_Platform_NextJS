import { combineReducers, configureStore } from "@reduxjs/toolkit";
import betReducers from "./features/bet/betSlice";
import sportsReducer from "./features/sports/sportsSlice";
import userReducer from "./features/user/userSlice";

// Combine reducers
const rootReducer = combineReducers({
  bet: betReducers,
  sports: sportsReducer,
  user: userReducer,
});

// Create the store
export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check if needed
      }),
  });

  return store;
};

// Type definitions
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
