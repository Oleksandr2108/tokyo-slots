import City from "../../assets/city.png";
import Cloud from "../../assets/cloud.png";

const Footer = () => {
  return (
    <>
      <div
        className="absolute bottom-31 left-0 right-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${City})`,
          minHeight: "30vh",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Cloud})`,
          minHeight: "220px",
        }}
      />
    </>
  );
};

export default Footer;
