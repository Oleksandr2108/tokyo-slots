import BetCount from "./components/BetCount/BetCount";
import FloatIcon from "./components/FloatIcon/FloatIcon";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Slots from "./components/Slots/Slots";
import SpinButton from "./components/SpinButton/SpinButton";
import SunPopup from "./components/SunPopup/SunPopup";
import { useGameStore } from "./store/useGameStore";

function App() {
  const showResult = useGameStore((state) => state.showResult);
  const isWinResult = useGameStore((state) => state.isWinResult);
  const closeResult = useGameStore((state) => state.closeResult);

  return (
    <div className="min-h-screen relative overflow-hidden pb-40">
      {showResult && (
        <div onClick={closeResult}>
          <SunPopup isWin={isWinResult} />
        </div>
      )}
      <FloatIcon />
      <Header />
      <Slots />
      <BetCount />
      <SpinButton />
      <Footer />
    </div>
  );
}

export default App;
