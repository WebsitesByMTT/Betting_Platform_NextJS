import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Bet {
  data: {
    currentBet?: number; // Define currentBet as optional or required depending on your needs
    // other properties
  };
  item: any; // Assuming item can be any type
}

interface BetState {
  bets: Bet[];
}

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
