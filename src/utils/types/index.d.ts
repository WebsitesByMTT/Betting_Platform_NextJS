export interface BetSlipCardProps {
  matchData: any;
  betData: any;
}

interface Bet {
  data: {
    currentBet?: number;
  };
  item: any;
}

export interface BetState {
  bets: Bet[];
}
