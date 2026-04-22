import "./App.css";
import BetCount from "./components/BetCount/BetCount";
import FloatIcon from "./components/FloatIcon/FloatIcon";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Slots from "./components/Slots/Slots";
import SpinButton from "./components/SpinButton/SpinButton";

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden pb-35">
      <FloatIcon/>
      <Header />
      <Slots />
      <BetCount />
      <SpinButton />
      <Footer />
    </div>
  );
}

export default App;
