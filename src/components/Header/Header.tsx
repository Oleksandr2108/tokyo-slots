import HeaderTitle from "../../assets/headerTitle.png";
import style from "./Header.module.css";
const Header = () => {
  return (
    <div className="relative  ">
      <div className={style.wavyBlock}></div>
      <div className={style.waveWrapper}>
        <svg
          className={style.waveBorder}
          viewBox="0 0 2520 20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="
          M0,10
          Q15,0 30,10
          T60,10 T90,10 T120,10 T150,10 T180,10 T210,10 T240,10 T270,10 T300,10
          T330,10 T360,10 T390,10 T420,10 T450,10 T480,10 T510,10 T540,10 T570,10 T600,10
          T630,10 T660,10 T690,10 T720,10 T750,10 T780,10 T810,10 T840,10 T870,10 T900,10
          T930,10 T960,10 T990,10 T1020,10 T1050,10 T1080,10 T1110,10 T1140,10 T1170,10 T1200,10
          T1230,10 T1260,10 T1290,10 T1320,10 T1350,10 T1380,10 T1410,10 T1440,10 T1470,10 T1500,10
          T1530,10 T1560,10 T1590,10 T1620,10 T1650,10 T1680,10 T1710,10 T1740,10 T1770,10 T1800,10
          T1830,10 T1860,10 T1890,10 T1920,10 T1950,10 T1980,10 T2010,10 T2040,10 T2070,10 T2100,10
          T2130,10 T2160,10 T2190,10 T2220,10 T2250,10 T2280,10 T2310,10 T2340,10 T2370,10 T2400,10
          T2430,10 T2460,10 T2490,10 T2520,10
          L2520,20 L0,20 Z
        "
            fill="#FFF6DE"
          />
        </svg>
      </div>

      <div className="w-85 h-16.25 m-auto absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-[30%] ">
        <img
          src={HeaderTitle}
          alt="Description"
          className="w-full h-full object-contain "
        />
        <h1
          className={`textShadowTitle absolute inset-0 flex items-start justify-center text-[#A5DFF7] text-[40px] font-bold  ${style.strokeText}`}
        >
          Tokyo Slots
        </h1>
      </div>
    </div>
  );
};

export default Header;
