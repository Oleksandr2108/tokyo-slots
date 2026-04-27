import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import BetCount from "./components/BetCount/BetCount";
import FloatIcon from "./components/FloatIcon/FloatIcon";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Slots from "./components/Slots/Slots";
import SpinButton from "./components/SpinButton/SpinButton";
import SunPopup from "./components/SunPopup/SunPopup";
import { useGameStore } from "./store/useGameStore";
import { useSound } from "./hooks/useSound";
import winSound from "./assets/sound/win.mp3";
import loseSound from "./assets/sound/lose.mp3";
import jackpotSound from "./assets/sound/jackpot.mp3";

function App() {
  const { showResult, isWinResult, isJackpot, closeResult } = useGameStore(
    useShallow((state) => ({
      showResult: state.showResult,
      isWinResult: state.isWinResult,
      isJackpot: state.isJackpot,
      closeResult: state.closeResult,
    })),
  );
  const { play: playWinSound } = useSound(winSound, { volume: 1 });
  const { play: playLoseSound } = useSound(loseSound, { volume: 1 });
  const { play: playJackpotSound } = useSound(jackpotSound, { volume: 0.6 });

  useEffect(() => {
    if (!showResult) {
      return;
    }

    if (isJackpot) {
      playJackpotSound();
      return;
    }

    if (isWinResult) {
      playWinSound();
      return;
    }

    playLoseSound();
  }, [
    isJackpot,
    isWinResult,
    playJackpotSound,
    playLoseSound,
    playWinSound,
    showResult,
  ]);

  return (
    <div className="min-h-screen relative overflow-hidden pb-40">
      {showResult && (
        <div onClick={closeResult}>
          <SunPopup isWin={isWinResult} />
        </div>
      )}
      <div className="hidden sm:block">
        <FloatIcon />
      </div>
      <Header />
      <div className="px-5 sm:px-0">
        <Slots />
        <BetCount />
        <SpinButton />
        <Footer />
      </div>
    </div>
  );
}

export default App;
