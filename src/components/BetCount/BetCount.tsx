import { useState } from "react";
import { useGameStore } from "../../store/useGameStore";

const BetCount = () => {
  const [minusPressed, setMinusPressed] = useState(false);
  const [plusPressed, setPlusPressed] = useState(false);
  const { betCount, increaseBet, decreaseBet } = useGameStore();
  const handlePress = (setter: (v: boolean) => void) => {
    setter(true);
    setTimeout(() => setter(false), 300);
  };

  return (
    <div className="mx-auto mt-5">
      <h3 className="textShadowSmallTitle text-[#54c3ee] text-[24px] stroke-black">
        Place a bid
      </h3>

      <div className="flex items-center justify-center gap-7 mt-5">
        {/* Button Minus */}
        <div
          className={`w-16 h-16 rounded-2xl transition-colors duration-800 ${minusPressed ? "bg-transparent" : "bg-gradient-to-b from-[#daf3a6] to-[#515895]"}`}
        >
          <div
            className={`w-full h-15 bg-white rounded-2xl border-2 border-[#341d1a]
            flex items-center justify-center cursor-pointer transition-transform duration-300
            ${minusPressed ? "translate-y-1 scale-95" : ""}`}
            onClick={() => {
              handlePress(setMinusPressed);
              decreaseBet();
            }}
          >
            <svg
              width="9"
              height="6"
              viewBox="0 0 9 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.899983 5.15001C0.583316 5.15001 0.349983 5.08335 0.199983 4.95001C0.0666496 4.80001 -1.70954e-05 4.56668 -1.70954e-05 4.25001V0.900012C-1.70954e-05 0.583345 0.0666496 0.358345 0.199983 0.225012C0.349983 0.0750115 0.583316 1.14739e-05 0.899983 1.14739e-05H7.59998C7.91665 1.14739e-05 8.14165 0.0750115 8.27498 0.225012C8.42498 0.358345 8.49998 0.583345 8.49998 0.900012V4.25001C8.49998 4.56668 8.42498 4.80001 8.27498 4.95001C8.14165 5.08335 7.91665 5.15001 7.59998 5.15001H0.899983Z"
                fill="#341D1A"
              />
            </svg>
          </div>
        </div>
        {/* Bet Count */}
        <div className=" flex items-end w-47.5 h-15 bg-[#665D5C] rounded-2xl border-2 border-[#341d1a]">
          <div className="mb-0 w-full flex items-center justify-center h-12.5 bg-[#887c7b] rounded-2xl border-t-2 border-[#341d1a]">
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
            <p className="text-white text-[20px] font-bold textShadow">
              {betCount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Button Plus */}
        <div
          className={`w-16 h-16 rounded-2xl transition-colors duration-800 ${plusPressed ? "bg-transparent" : "bg-gradient-to-b from-[#daf3a6] to-[#515895]"}`}
        >
          <div
            className={`w-full h-15 bg-white rounded-2xl border-2 border-[#341d1a]
            flex items-center justify-center cursor-pointer transition-transform duration-300
            ${plusPressed ? "translate-y-1 scale-95" : ""}`}
            onClick={() => {
              handlePress(setPlusPressed);
              increaseBet();
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.87498 13.95C9.87498 14.2667 9.79998 14.5 9.64998 14.65C9.51665 14.7833 9.29165 14.85 8.97498 14.85H5.87498C5.55832 14.85 5.32498 14.7833 5.17498 14.65C5.04165 14.5 4.97498 14.2667 4.97498 13.95V9.74999H0.899983C0.583316 9.74999 0.349983 9.68332 0.199983 9.54999C0.0666495 9.39999 -1.71587e-05 9.16665 -1.71587e-05 8.84999V5.99999C-1.71587e-05 5.68332 0.0666495 5.45832 0.199983 5.32499C0.349983 5.17499 0.583316 5.09999 0.899983 5.09999H4.97498V0.899987C4.97498 0.58332 5.04165 0.35832 5.17498 0.224988C5.32498 0.0749877 5.55832 -1.23382e-05 5.87498 -1.23382e-05H8.97498C9.29165 -1.23382e-05 9.51665 0.0749877 9.64998 0.224988C9.79998 0.35832 9.87498 0.58332 9.87498 0.899987V5.09999H13.95C14.2666 5.09999 14.4917 5.17499 14.625 5.32499C14.775 5.45832 14.85 5.68332 14.85 5.99999V8.84999C14.85 9.16665 14.775 9.39999 14.625 9.54999C14.4917 9.68332 14.2666 9.74999 13.95 9.74999H9.87498V13.95Z"
                fill="#341D1A"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetCount;
