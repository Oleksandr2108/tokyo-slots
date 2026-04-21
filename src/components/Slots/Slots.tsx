import { useState } from "react";
import MainImg from "../../assets/slots.png";
import Stick from "../../assets/stick.png";
import Ball from "../../assets/ball.png";

import style from "./Slots.module.css";
const Slots = () => {
  const [state, setState] = useState("down");

  const toggle = () => {
    setState((prev) => (prev === "down" ? "up" : "down"));
  };
  return (
    <div className="relative w-125 mx-auto mt-18">
      <img
        src={MainImg}
        alt="Slots"
        className="w-full"
      />
      <div
        className="absolute top-[35%] right-3 translate-x-[50%] -translate-y-[50%] cursor-pointer"
        onClick={toggle}
      >
        <div className={`${style.stick} ${style[state]}`}>
          {" "}
          <img
            src={Stick}
            alt="stick"
          />{" "}
        </div>
        <div className={`${style.ball} ${style[state]}`}>
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
