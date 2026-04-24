import type { SlotIconId, WinResult } from "./gameTypes";

const PAYTABLE: Record<
  SlotIconId,
  {
    two: number;
    three: number;
    four: number;
  }
> = {
  seven: { two: 2, three: 12, four: 50 },
  crown: { two: 1.8, three: 8, four: 20 },
  diamant: { two: 1.6, three: 6, four: 15 },
  cheryslot: { two: 1.4, three: 5, four: 12 },
  lemon: { two: 1.3, three: 4, four: 10 },
  cent: { two: 1.2, three: 3, four: 8 },
  smileCent: { two: 1.2, three: 3, four: 8 },
};

export const toMoney = (value: number) => Math.round(value * 100) / 100;

export const calculateWin = (reels: SlotIconId[], bet: number): WinResult => {
  const counts = reels.reduce<Record<SlotIconId, number>>(
    (acc, iconId) => {
      acc[iconId] += 1;
      return acc;
    },
    {
      cent: 0,
      cheryslot: 0,
      crown: 0,
      diamant: 0,
      lemon: 0,
      seven: 0,
      smileCent: 0,
    },
  );

  let matchedIcon: SlotIconId | null = null;
  let matchCount = 0;

  (Object.keys(counts) as SlotIconId[]).forEach((iconId) => {
    if (counts[iconId] > matchCount) {
      matchCount = counts[iconId];
      matchedIcon = iconId;
    }
  });

  if (matchedIcon === null || matchCount < 2) {
    return {
      winAmount: 0,
      isJackpot: false,
      matchedIcon: null,
      matchCount,
    };
  }

  const payout: { two: number; three: number; four: number } =
    PAYTABLE[matchedIcon as SlotIconId];
  const multiplier =
    matchCount >= 4
      ? payout.four
      : matchCount === 3
        ? payout.three
        : payout.two;

  return {
    winAmount: toMoney(bet * multiplier),
    isJackpot: matchedIcon === "seven" && matchCount >= 4,
    matchedIcon,
    matchCount,
  };
};
