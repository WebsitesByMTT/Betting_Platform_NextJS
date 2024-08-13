import { Socket } from "socket.io-client";

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

interface FormData {
  username: string;
  password: string;
  captcha: string;
  captchaToken: string;
}

interface DecodedToken {
  role: string;
}

interface Event {
  key: string;
  title: string;
}

interface Leagues {
  sport_title: string;
  home_team: string;
  away_team: string;
}
