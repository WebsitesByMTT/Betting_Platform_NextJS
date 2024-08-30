import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bet, BetDetails } from "@/utils/types";

interface BetState {
  allbets: BetDetails[];
  totalBetAmount: any;
  potentialWin: any;
  totalOdds: any;
  myBets: any;
}

const initialState: BetState = {
  allbets: [],
  totalBetAmount: 0,
  potentialWin: 0,
  totalOdds: 0,
  myBets: [],
};

export const betSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    addAllBets: (state, action: PayloadAction<BetDetails>) => {
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
    calculateTotalBetAmount: (state) => {
      let totalAmount = 0;
      for (const bet of state.allbets) {
        totalAmount += bet.amount;
      }
      state.totalBetAmount = totalAmount;
    },
    calculateTotalOdds: (state) => {
      let totalOdds = 1;
      for (const bet of state.allbets) {
        const odds =
          bet.bet_on === "home_team"
            ? parseFloat(bet.home_team.odds)
            : parseFloat(bet.away_team.odds);

        totalOdds *= odds;
      }
      state.totalOdds = totalOdds;
    },
    calculatePotentialWin: (
      state,
      action: PayloadAction<{ betType: String; comboBetAmount: number }>
    ) => {
      const { betType, comboBetAmount } = action.payload;
      switch (betType) {
        case "single":
          let totalPotentialWin = 0;
          for (const bet of state.allbets) {
            const odds =
              bet.bet_on === "home_team"
                ? parseFloat(bet.home_team.odds)
                : parseFloat(bet.away_team.odds);

            totalPotentialWin += bet.amount * odds;
          }
          state.potentialWin = totalPotentialWin;
          break;
        case "combo":
          state.potentialWin = state.totalOdds * comboBetAmount;
          break;
        default:
          break;
      }
    },
    setMyBets(state, action: PayloadAction<[]>) {
      state.myBets = action.payload;
    },
  },
});

export const {
  addAllBets,
  updateBetAmount,
  updateAllBetsAmount,
  deleteBet,
  deleteAllBets,
  calculateTotalBetAmount,
  calculateTotalOdds,
  calculatePotentialWin,
  setMyBets,
} = betSlice.actions;
export default betSlice.reducer;
