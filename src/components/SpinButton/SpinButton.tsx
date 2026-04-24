import { useEffect } from "react";
import btnTop from "../../assets/btnTop.png";
import btnAside from "../../assets/btnAside.png";
import btnBottom from "../../assets/btnBottom.png";
import { useGameStore } from "../../store/useGameStore";
import { useSound } from "../../hooks/useSound";
import startGameSound from "../../assets/sound/startGame.mp3";

const SpinButton = () => {
  const isSpinning = useGameStore((state) => state.isSpinning);
  const showResult = useGameStore((state) => state.showResult);
  const betCount = useGameStore((state) => state.betCount);
  const balance = useGameStore((state) => state.balance);
  const startGame = useGameStore((state) => state.startGame);
  const stopGame = useGameStore((state) => state.stopGame);
  const { play: playStartGameSound, stop: stopStartGameSound } = useSound(
    startGameSound,
    { volume: 0.5 },
  );

  useEffect(() => {
    return () => {
      stopGame();
    };
  }, [stopGame]);

  useEffect(() => {
    if (showResult) {
      stopStartGameSound();
    }
  }, [showResult, stopStartGameSound]);

  const handleStartGame = () => {
    if (isSpinning || betCount === 0 || balance <= 0) {
      return;
    }

    playStartGameSound();
    startGame();
  };

  return (
    <div
      className="relative w-60 h-40 mx-auto mt-18 cursor-pointer select-none touch-manipulation"
      style={{ WebkitTapHighlightColor: "transparent" }}
      onClick={handleStartGame}
    >
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-full h-full flex items-center justify-center z-10">
        <div className="relative w-full h-full">
          <img
            src={btnTop}
            alt="btnTop"
            draggable={false}
            className={`w-46.75 absolute top-0 left-1/2 -translate-x-1/2 z-40 transition-transform duration-150 ${isSpinning ? "translate-y-2" : "translate-y-0"}`}
          />
          <img
            src={btnAside}
            alt="btnAside"
            draggable={false}
            className={`absolute w-50 top-13.5 left-1/2 -translate-x-1/2 z-10 transition-transform duration-150 ${isSpinning ? "translate-y-2" : "translate-y-0"}`}
          />
        </div>
        <img
          src={btnBottom}
          alt="btnBottom"
          draggable={false}
          className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
        />
      </div>
    </div>
  );
};

export default SpinButton;
