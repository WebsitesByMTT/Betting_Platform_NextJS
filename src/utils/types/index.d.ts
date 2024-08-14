import { Socket } from "socket.io-client";

export interface BetSlipCardProps {
  matchData: any;
  betData: any;
}

interface Bet extends initialBets {
  away_team: {
    name: string;
    odds: string;
  };
  home_team: {
    name: string;
    odds: string;
  };
  bet_on: string;
  market: string;
  oddsFormat: string;
  player: string;
  sport: string;
  sport_title: string;
  event_id: string;
  commence_time: string;
  status: string;
  amount: number;
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
