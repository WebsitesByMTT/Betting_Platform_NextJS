import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bet } from "@/utils/types";

interface BetState {
  allbets: Bet[];
}

const initialState: BetState = {
  allbets: [],
};

export const betSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    addAllBets: (state, action: PayloadAction<Bet>) => {
      const bet = state.allbets.find((bet) => bet.id === action.payload.id);
      if (!bet) {
        state.allbets.push(action.payload);
      } else {
        state.allbets = state.allbets.filter(
          (bet) => bet.id !== action.payload.id
        );
      }
    },
    updateBetAmount: (
      state,
      action: PayloadAction<{ betId: string; amount: number }>
    ) => {
      const { betId, amount } = action.payload;
      const bet = state.allbets.find((bet) => bet.id === betId);
      if (bet) {
        bet.amount = amount;
      }
    },
    updateAllBetsAmount: (state, action: PayloadAction<{ amount: number }>) => {
      const { amount } = action.payload;
      state.allbets.forEach((bet) => {
        bet.amount = amount;
      });
    },
    deleteBet: (state, action: PayloadAction<{ betId: string }>) => {
      const { betId } = action.payload;
      state.allbets = state.allbets.filter((bet) => bet.id !== betId);
    },
    deleteAllBets: (state) => {
      state.allbets = [];
    },
  },
});

export const {
  addAllBets,
  updateBetAmount,
  updateAllBetsAmount,
  deleteBet,
  deleteAllBets,
} = betSlice.actions;
export default betSlice.reducer;
