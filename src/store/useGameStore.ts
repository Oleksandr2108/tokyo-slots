import { create } from "zustand";

import CentIcon from "../assets/floatIcons/cent.svg";
import CheryslotIcon from "../assets/floatIcons/cheryslot.svg";
import CrownIcon from "../assets/floatIcons/Crown.svg";
import DiamantIcon from "../assets/floatIcons/diamant.svg";
import LemonIcon from "../assets/floatIcons/lemon.svg";
import SevenIcon from "../assets/floatIcons/seven.svg";
import SmileCentIcon from "../assets/floatIcons/smileCent.svg";

type LeverState = "down" | "up";
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

interface GameState {
  leverState: LeverState;
  reels: SlotIconId[];
  spinning: boolean[];
  isSpinning: boolean;
  betCount: number;
  balance: number;
  setBalance: (amount: number) => void;

  increaseBet: () => void;
  decreaseBet: () => void;
  startGame: () => void;
  stopGame: () => void;
}

export const reelIcons: SlotIcon[] = [
  { id: "cent", src: CentIcon },
  { id: "cheryslot", src: CheryslotIcon },
  { id: "crown", src: CrownIcon },
  { id: "diamant", src: DiamantIcon },
  { id: "lemon", src: LemonIcon },
  { id: "seven", src: SevenIcon },
  { id: "smileCent", src: SmileCentIcon },
];

const REEL_COUNT = 4;
const STEP_DELAY = 500;
const TICK_SPEED = 120;
const SPIN_DURATION = 1900;
const LEVER_RESET_TIME = 1000;

const createDefaultReels = () =>
  Array.from({ length: REEL_COUNT }, () => "seven" as SlotIconId);

const createDefaultSpinning = () =>
  Array.from({ length: REEL_COUNT }, () => false);

let timeoutIds: number[] = [];
let intervalIds: number[] = [];

const clearAllTimers = () => {
  timeoutIds.forEach((id) => window.clearTimeout(id));
  intervalIds.forEach((id) => window.clearInterval(id));
  timeoutIds = [];
  intervalIds = [];
};

export const useGameStore = create<GameState>((set, get) => ({
  leverState: "down",
  reels: createDefaultReels(),
  spinning: createDefaultSpinning(),
  isSpinning: false,
  betCount: 0,
  balance: 99999.99,
  setBalance: (amount: number) =>
    set(() => ({
      balance: amount,
    })),
  increaseBet: () =>
    set((state) => ({
      betCount:
        state.betCount < state.balance ? state.betCount + 10 : state.betCount,
    })),
  decreaseBet: () =>
    set((state) => ({
      betCount: state.betCount > 10 ? state.betCount - 10 : 0,
    })),

  startGame: () => {
    if (get().isSpinning) {
      return;
    }
    if (get().betCount === 0) {
      return;
    }
    const newBalance = get().balance - get().betCount;
    set({ balance: newBalance });

    clearAllTimers();

    set({
      leverState: "up",
      isSpinning: true,
      spinning: createDefaultSpinning(),
    });

    const resetLeverTimeout = window.setTimeout(() => {
      set({ leverState: "down" });
    }, LEVER_RESET_TIME);

    timeoutIds.push(resetLeverTimeout);

    const reelFinishMoments = Array.from(
      { length: REEL_COUNT },
      (_, index) => index * STEP_DELAY + SPIN_DURATION,
    );
    const maxFinish = Math.max(...reelFinishMoments);

    for (let index = 0; index < REEL_COUNT; index += 1) {
      const startDelay = index * STEP_DELAY;

      const startTimeout = window.setTimeout(() => {
        set((state) => ({
          spinning: state.spinning.map((item, i) =>
            i === index ? true : item,
          ),
        }));

        const spinInterval = window.setInterval(() => {
          const randomIcon =
            reelIcons[Math.floor(Math.random() * reelIcons.length)]?.id ??
            "seven";
          set((state) => ({
            reels: state.reels.map((item, i) =>
              i === index ? randomIcon : item,
            ),
          }));
        }, TICK_SPEED);

        intervalIds.push(spinInterval);

        const stopTimeout = window.setTimeout(() => {
          window.clearInterval(spinInterval);
          intervalIds = intervalIds.filter((id) => id !== spinInterval);

          set((state) => ({
            spinning: state.spinning.map((item, i) =>
              i === index ? false : item,
            ),
          }));
        }, SPIN_DURATION);

        timeoutIds.push(stopTimeout);
      }, startDelay);

      timeoutIds.push(startTimeout);
    }

    const finishTimeout = window.setTimeout(() => {
      set({ isSpinning: false });
    }, maxFinish);

    timeoutIds.push(finishTimeout);
  },

  stopGame: () => {
    clearAllTimers();
    set({
      isSpinning: false,
      spinning: createDefaultSpinning(),
    });
  },
}));
