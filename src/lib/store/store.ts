import { combineReducers, configureStore } from "@reduxjs/toolkit";
import betReducers from "./features/bet/betSlice";
import sportsReducer from "./features/sports/sportsSlice";
import userReducer from "./features/user/userSlice";
import notificationReducer from "./features/notification/notificationSlice";


// Combine reducers
const rootReducer = combineReducers({
  bet: betReducers,
  sports: sportsReducer,
  user: userReducer,
  notification:notificationReducer
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
