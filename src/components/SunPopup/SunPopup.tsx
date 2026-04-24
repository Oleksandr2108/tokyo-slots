import { useEffect } from "react";
import "./SunPopup.css";
import PopapWinBg from "../../assets/popapWin.svg";
import PopapLoseBg from "../../assets/popapLose.svg";

import { parseBalanceParts } from "../../utils/parseBalanceParts";
import { useGameStore } from "../../store/useGameStore";

interface SunPopupProps {
  isWin: boolean;
}

function SunPopup({ isWin }: SunPopupProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  const lastWinAmount = useGameStore((state) => state.lastWinAmount);
  const betCount = useGameStore((state) => state.betCount);
  const amountToShow = isWin ? lastWinAmount : betCount;
  const balanceFromStore: string | number = amountToShow.toFixed(2);
  const { wholePart, fractionPart, separator } =
    parseBalanceParts(balanceFromStore);
  return (
    <div
      className="sunPopup"
      style={!isWin ? { background: "rgba(186, 86, 43, 0.9)" } : undefined}
      role="dialog"
      aria-modal="true"
      aria-label="Sun popup"
    >
      {isWin && (
        <>
          <div className="sunPopup__rays sunPopup__rays--slow" />
          <div className="sunPopup__rays sunPopup__rays--fast" />
        </>
      )}

      <div className="sunPopup__content ">
        <img
          src={isWin ? PopapWinBg : PopapLoseBg}
          alt="Popup background"
          className="sunPopup__background"
        />

        <h2
          className={`${isWin ? "sunPopup__title--win" : "sunPopup__title--lose"} `}
        >
          {isWin ? (
            "You win!!!"
          ) : (
            <>
              You <span className="text-[#E71E3F]">lose!</span>
            </>
          )}
        </h2>
        <div className="absolute z-50 top-1/2 -translate-y-1/4 left-0 right-0 flex items-center justify-center ">
          <div className="w-6 h-6  flex items-center justify-center rounded-full bg-[#F7405E] mr-2 border-4 border-[#341d1a] boxShadow">
            <svg
              width="7"
              height="8"
              viewBox="0 0 7 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.23333 8H2.43333C2.29259 8 2.18889 7.97037 2.12222 7.91111C2.06296 7.84444 2.03333 7.74074 2.03333 7.6V2.14444H0.4C0.259259 2.14444 0.155556 2.11481 0.0888889 2.05556C0.0296296 1.98889 0 1.88519 0 1.74444V0.4C0 0.259259 0.0296296 0.15926 0.0888889 0.1C0.155556 0.0333335 0.259259 0 0.4 0H6.26667C6.40741 0 6.50741 0.0333335 6.56667 0.1C6.63333 0.15926 6.66667 0.259259 6.66667 0.4V1.74444C6.66667 1.88519 6.63333 1.98889 6.56667 2.05556C6.50741 2.11481 6.40741 2.14444 6.26667 2.14444H4.63333V7.6C4.63333 7.74074 4.6 7.84444 4.53333 7.91111C4.47407 7.97037 4.37407 8 4.23333 8Z"
                fill="#691010"
              />
            </svg>
          </div>
          <p className="text-white text-[30px] font-bold [-webkit-text-stroke:1px_rgba(81,82,26,0.3)]">
            <span>
              {isWin ? "+" : "-"}
              {wholePart}{" "}
            </span>
            {fractionPart && (
              <span className="text-white/30">
                {separator}
                {fractionPart}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SunPopup;
