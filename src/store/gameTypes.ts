export type LeverState = "down" | "up";

export type SlotIconId =
  | "cent"
  | "cheryslot"
  | "crown"
  | "diamant"
  | "lemon"
  | "seven"
  | "smileCent";

export interface SlotIcon {
  id: SlotIconId;
  src: string;
}

export interface WinResult {
  winAmount: number;
  isJackpot: boolean;
  matchedIcon: SlotIconId | null;
  matchCount: number;
}

export interface GameState {
  leverState: LeverState;
  reels: SlotIconId[];
  spinning: boolean[];
  isSpinning: boolean;
  showResult: boolean;
  isWinResult: boolean;
  lastWinAmount: number;
  isJackpot: boolean;
  lastMatchedIcon: SlotIconId | null;
  lastMatchCount: number;
  betCount: number;
  balance: number;
  setBalance: (amount: number) => void;
  increaseBet: () => void;
  decreaseBet: () => void;
  startGame: () => void;
  stopGame: () => void;
  closeResult: () => void;
}
