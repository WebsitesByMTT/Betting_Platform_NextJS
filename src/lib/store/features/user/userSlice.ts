import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  credits: number;
}

const initialState: UserState = {
  credits: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserCredits(state, action: PayloadAction<number>) {
      state.credits = action.payload;
    },
  },
});

export const { setUserCredits } = userSlice.actions;

export default userSlice.reducer;
