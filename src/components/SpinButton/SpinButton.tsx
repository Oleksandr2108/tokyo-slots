import { useShallow } from "zustand/shallow";
import btnTop from "../../assets/btnTop.png";
import btnAside from "../../assets/btnAside.png";
import btnBottom from "../../assets/btnBottom.png";
import { useGameStore } from "../../store/useGameStore";

interface SpinButtonProps {
  onStartGame: () => void;
}

const SpinButton = ({ onStartGame }: SpinButtonProps) => {
  const { isSpinning } = useGameStore(
    useShallow((state) => ({
      isSpinning: state.isSpinning,
    })),
  );

  return (
    <div
      className="relative w-60 h-40 mx-auto mt-18 cursor-pointer select-none touch-manipulation"
      style={{ WebkitTapHighlightColor: "transparent" }}
      onClick={onStartGame}
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
