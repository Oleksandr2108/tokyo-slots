import { useEffect } from "react";
import btnTop from "../../assets/btnTop.png";
import btnAside from "../../assets/btnAside.png";
import btnBottom from "../../assets/btnBottom.png";
import { useGameStore } from "../../store/useGameStore";

const SpinButton = () => {
  const isSpinning = useGameStore((state) => state.isSpinning);
  const startGame = useGameStore((state) => state.startGame);
  const stopGame = useGameStore((state) => state.stopGame);

  useEffect(() => {
    return () => {
      stopGame();
    };
  }, [stopGame]);

  return (
    <div
      className="relative w-60 h-40 mx-auto mt-18 cursor-pointer"
      onClick={startGame}
    >
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-full h-full flex items-center justify-center z-10">
        <div className="relative w-full h-full">
          <img
            src={btnTop}
            alt="btnTop"
            className={`w-46.75 absolute top-0 left-1/2 -translate-x-1/2 z-40 transition-transform duration-150 ${isSpinning ? "translate-y-2" : "translate-y-0"}`}
          />
          <img
            src={btnAside}
            alt="btnAside"
            className={`absolute w-50 top-13.5 left-1/2 -translate-x-1/2 z-10 transition-transform duration-150 ${isSpinning ? "translate-y-2" : "translate-y-0"}`}
          />
        </div>
        <img
          src={btnBottom}
          alt="btnBottom"
          className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
        />
      </div>
    </div>
  );
};

export default SpinButton;
