import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  LEVER_RESET_TIME,
  REEL_COUNT,
  RESULT_POPUP_HIDE_DELAY,
  RESULT_SETTLE_DELAY,
  SPIN_DURATION,
  STEP_DELAY,
  TICK_SPEED,
  createDefaultReels,
  createDefaultSpinning,
  reelIcons,
} from "./gameConfig";
import type { GameState } from "./gameTypes";
import { calculateWin, toMoney } from "./gameWinLogic";

export { reelIcons };

let timeoutIds: number[] = [];
let intervalIds: number[] = [];

const clearAllTimers = () => {
  timeoutIds.forEach((id) => window.clearTimeout(id));
  intervalIds.forEach((id) => window.clearInterval(id));
  timeoutIds = [];
  intervalIds = [];
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
  leverState: "down",
  reels: createDefaultReels(),
  spinning: createDefaultSpinning(),
  isSpinning: false,
  showResult: false,
  isWinResult: false,
  lastWinAmount: 0,
  isJackpot: false,
  lastMatchedIcon: null,
  lastMatchCount: 0,
  betCount: 10,
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
  setBet: (amount: number) =>
    set((state) => ({
      betCount:
        amount >= state.balance ? state.balance : amount < 10 ? 10 : amount,
    })),

  startGame: () => {
    if (get().isSpinning) {
      return;
    }
    if (get().betCount === 0 || get().balance <= 0) {
      return;
    }

    const balance = get().balance;
    const clampedBet = get().betCount > balance ? balance : get().betCount;
    if (clampedBet !== get().betCount) {
      set({ betCount: clampedBet });
    }
    const currentBet = clampedBet;
    const newBalance = balance - currentBet;
    set({ balance: newBalance });

    clearAllTimers();

    set({
      leverState: "up",
      isSpinning: true,
      spinning: createDefaultSpinning(),
      showResult: false,
      isWinResult: false,
      isJackpot: false,
      lastWinAmount: 0,
      lastMatchedIcon: null,
      lastMatchCount: 0,
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
      const result = calculateWin(get().reels, currentBet);

      set((state) => ({
        isSpinning: false,
        showResult: true,
        isWinResult: result.winAmount > 0,
        balance: toMoney(state.balance + result.winAmount),
        lastWinAmount: result.winAmount,
        isJackpot: result.isJackpot,
        lastMatchedIcon: result.matchedIcon,
        lastMatchCount: result.matchCount,
      }));

      const hideResultTimeout = window.setTimeout(() => {
        set({ showResult: false });
      }, RESULT_POPUP_HIDE_DELAY);

      timeoutIds.push(hideResultTimeout);
    }, maxFinish + RESULT_SETTLE_DELAY);

    timeoutIds.push(finishTimeout);
  },

  stopGame: () => {
    clearAllTimers();
    set({
      isSpinning: false,
      spinning: createDefaultSpinning(),
      showResult: false,
    });
  },

  closeResult: () => {
    set({ showResult: false });
  },
}),
    {
      name: "tokyo-slots-storage",
      partialize: (state) => ({ balance: state.balance }),
    }
  )
);
