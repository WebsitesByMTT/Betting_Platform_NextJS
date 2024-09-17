import { Socket } from "socket.io-client";

interface BetDetails {
  id: string;
  away_team: {
    name: string;
    odds: string;
    points?: number;
  };
  home_team: {
    name: string;
    odds: string;
    points?: number;
  };
  bet_on: string;
  market: string;
  oddsFormat: string;
  sport_key: string;
  sport_title: string;
  event_id: string;
  commence_time: string;
  selected: string;
  amount: number;
}

interface Bet extends BetDetails {
  player: string;
  data: BetDetails[];
  amount: number;
  betType: string;
}

interface FormData {
  username: string;
  password: string;
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

interface Mybet {
  commence_time: string;
  home_team: {
    name: string;
    odds: number;
  };
  away_team: {
    name: string;
    odds: number;
  };
  bet_on: string;
  amount: number;
  status: string;
  possibleWinningAmount: number;
  retryCount: number;
}

interface SportItem {
  category: string;
  events: Array<{
    title: string;
    key: string;
  }>;
}