import All from "./sidebar/All";
import AmericanFootball from "./sidebar/AmericanFootball";
import AussieRules from "./sidebar/AussieRules";
import Baseball from "./sidebar/Baseball";
import Basketball from "./sidebar/Basketball";
import Boxing from "./sidebar/Boxing";
import Cricket from "./sidebar/Cricket";
import Golf from "./sidebar/Golf";
import IceHockey from "./sidebar/IceHockey";
import Lacrosse from "./sidebar/Lacrosse";
import MixedMartialArts from "./sidebar/MixedMartialArts";
import Politics from "./sidebar/Politics";
import RugbyLeague from "./sidebar/RugbyLeague";
import Soccer from "./sidebar/Soccer";
import Tennis from "./sidebar/Tennis";

export const svgMap: Record<string, React.ReactNode> = {
  "all": <All />,
  "american football": <AmericanFootball />,
  "aussie rules": <AussieRules />,
  "baseball": <Baseball />,
  "basketball": <Basketball />,
  "boxing": <Boxing />,
  "cricket": <Cricket />,
  "golf": <Golf />,
  "ice hockey": <IceHockey/>,
  "lacrosse": <Lacrosse/>,
  "mixed martial arts": <MixedMartialArts/>,
  "politics": <Politics/>,
  "rugby league": <RugbyLeague/>,
  "soccer": <Soccer/>,
  "tennis": <Tennis/>
};
