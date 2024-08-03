import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BetState, Bet } from "@/utils/types";

const initialState: BetState = {
  bets: [],
};

export const betSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Bet>) => {
      state.bets.push(action.payload);
    },
    updateCurrentBet: (state, action: PayloadAction<{ amount: number }>) => {
      const { amount } = action.payload;
      state.bets.forEach((bet) => {
        if (bet.data) {
          bet.data.currentBet = amount;
        }
      });
    },
  },
});

export const { add, updateCurrentBet } = betSlice.actions;
export default betSlice.reducer;
