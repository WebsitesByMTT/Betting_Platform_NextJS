import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bet, BetDetails } from "@/utils/types";

interface BetState {
  allbets: BetDetails[];
  totalBetAmount: any;
  potentialWin: any;
  totalOdds: any;
  myBets: any;
  notificationBet: string;
  oddsMismatch: any[];
}

const initialState: BetState = {
  allbets: [],
  totalBetAmount: 0,
  potentialWin: 0,
  totalOdds: 0,
  myBets: [],
  notificationBet: "",
  oddsMismatch: [],
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
        const exists = state.oddsMismatch.some(
          (item) => item.id === action.payload.id
        );
        if (exists) {
          state.oddsMismatch = state.oddsMismatch.filter(
            (bet) => bet.id !== action.payload.id
          );
        }
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
      const exists = state.oddsMismatch.some((item) => item.id === betId);
      if (exists) {
        state.oddsMismatch = state.oddsMismatch.filter(
          (bet) => bet.id !== betId
        );
      }
    },
    deleteAllBets: (state) => {
      state.allbets = [];
      state.oddsMismatch = [];
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
      for (const bet of state?.allbets) {
        const odds = bet?.bet_on?.odds;

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
            const odds = bet.bet_on.odds;

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
    notificationBet: (state, action: PayloadAction<{ betId: string }>) => {
      const { betId } = action.payload;
      state.notificationBet = betId;
    },
    setOddsMismatch: (state, action: PayloadAction<any>) => {
      const payloadId = action.payload.id;
      const exists = state.oddsMismatch.some((item) => item.id === payloadId);
      if (!exists) {
        state.oddsMismatch.push(action.payload);
      }
    },
    setBetLoadingState: (state, action: PayloadAction<boolean>) => {
      state.allbets.forEach((bet) => {
        bet.loading = action.payload;
      });
    },
    updateBetSlipOdds: (state, action: PayloadAction<any>) => {
      const { eventId, latestOdds } = action.payload;
      console.log(latestOdds);
      const bets: any[] = state.allbets.filter(
        (bet) => bet.event_id === eventId
      );
      if (bets.length > 0) {
        for (const bet of bets) {
          const marketData = latestOdds?.markets?.find(
            (data: any) => data.key === bet?.category
          );
          if (marketData) {
            const oddsData = marketData?.outcomes?.find(
              (outcome: any) => outcome.name === bet.bet_on.name
            );
            if (oddsData) {
              const prevOdds = bet.bet_on.odds;
              bet.bet_on.prevOdds = prevOdds;
              bet.bet_on.odds = oddsData.price;
            }
          }
        }
      }
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
  notificationBet,
  setOddsMismatch,
  setBetLoadingState,
  updateBetSlipOdds,
} = betSlice.actions;
export default betSlice.reducer;
