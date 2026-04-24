import CentIcon from "../assets/floatIcons/cent.svg";
import CheryslotIcon from "../assets/floatIcons/cheryslot.svg";
import CrownIcon from "../assets/floatIcons/Crown.svg";
import DiamantIcon from "../assets/floatIcons/diamant.svg";
import LemonIcon from "../assets/floatIcons/lemon.svg";
import SevenIcon from "../assets/floatIcons/seven.svg";
import SmileCentIcon from "../assets/floatIcons/smileCent.svg";
import type { SlotIcon, SlotIconId } from "./gameTypes";

export const reelIcons: SlotIcon[] = [
  { id: "cent", src: CentIcon },
  { id: "cheryslot", src: CheryslotIcon },
  { id: "crown", src: CrownIcon },
  { id: "diamant", src: DiamantIcon },
  { id: "lemon", src: LemonIcon },
  { id: "seven", src: SevenIcon },
  { id: "smileCent", src: SmileCentIcon },
];

export const REEL_COUNT = 4;
export const STEP_DELAY = 500;
export const TICK_SPEED = 120;
export const SPIN_DURATION = 1900;
export const LEVER_RESET_TIME = 1000;
export const RESULT_SETTLE_DELAY = 60;
export const RESULT_POPUP_HIDE_DELAY = 1800;

export const createDefaultReels = () =>
  Array.from({ length: REEL_COUNT }, () => "seven" as SlotIconId);

export const createDefaultSpinning = () =>
  Array.from({ length: REEL_COUNT }, () => false);
