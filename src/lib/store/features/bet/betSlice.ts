import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bet } from "@/utils/types";

interface BetState {
  allbets: Bet[];
  placedbets: Bet[];
}

const initialState: BetState = {
  allbets: [],
  placedbets: [],
};

export const betSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    addAllBets: (state, action: PayloadAction<Bet>) => {
      state.allbets.push(action.payload);
    },
    updateBetAmount: (
      state,
      action: PayloadAction<{ betId: string; amount: number }>
    ) => {
      const { betId, amount } = action.payload;
      const bet = state.allbets.find((bet) => bet.event_id === betId);
      if (bet) {
        bet.amount = amount;
      }
    },
  },
});

export const { addAllBets, updateBetAmount } = betSlice.actions;
export default betSlice.reducer;
