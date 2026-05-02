import { useShallow } from "zustand/shallow";
import MainImg from "../../assets/slots.png";
import Stick from "../../assets/stick.png";
import Ball from "../../assets/ball.png";
import { reelIcons, useGameStore } from "../../store/useGameStore";

import style from "./Slots.module.css";

const iconById = Object.fromEntries(
  reelIcons.map((icon) => [icon.id, icon.src]),
);

interface SlotsProps {
  onStartGame: () => void;
}

const Slots = ({ onStartGame }: SlotsProps) => {
  const { leverState, reels, spinning } = useGameStore(
    useShallow((state) => ({
      leverState: state.leverState,
      reels: state.reels,
      spinning: state.spinning,
    })),
  );

  return (
    <div className="relative w-full max-w-[31.25rem] mx-auto mt-12 sm:mt-18">
      <img
        src={MainImg}
        alt="Slots"
        className="w-full"
      />
      <div className="absolute top-0 left-[10.4%] h-full flex items-center justify-center pointer-events-none gap-[clamp(0.35rem,1.7vw,1rem)]">
        {reels.map((iconId, index) => (
          <div
            key={`reel-${index}`}
            className="w-[clamp(2.8rem,15vw,5rem)] h-[clamp(5.2rem,27vw,8.75rem)] rounded-2xl border-2 border-[#341d1a] bg-white flex items-center flex-col justify-center overflow-hidden"
          >
            <div className="bg-[#E2E2E2] w-full h-[clamp(1.15rem,3.8vw,2rem)] flex-1 z-50 border-t-4 border-[#ffce92b8]" />
            <img
              src={iconById[iconId]}
              alt="slot icon"
              className={`${style.reelIcon} ${spinning[index] ? style.reelIconSpin : ""}`}
            />
            <div className="bg-[#E2E2E2] w-full h-[clamp(1.15rem,3.8vw,2rem)] flex-1 z-50 border-b-4 border-[#3b3b3bb8]" />
          </div>
        ))}
      </div>
      <div
        className="absolute top-[35%] right-[2%] sm:right-3 translate-x-[50%] -translate-y-[50%] cursor-pointer scale-90 sm:scale-100"
        onClick={onStartGame}
      >
        <div className={`${style.stick} ${style[leverState]}`}>
          {" "}
          <img
            src={Stick}
            alt="stick"
          />{" "}
        </div>
        <div className={`${style.ball} ${style[leverState]}`}>
          <img
            src={Ball}
            alt="ball"
          />
        </div>
      </div>
    </div>
  );
};

export default Slots;
