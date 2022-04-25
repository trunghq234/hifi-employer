import logo from "@/assets/images/Logo.png";
import { Image } from "antd";

const SideBar = () => {
  return (
    <div className={`bg-primary-color flex items-center flex-col justify-center min-h-full`}>
      <div className="flex flex-col items-center !text-white">
        <Image src={logo} alt="logo" height={50} width={50} />
        <h1 className="text-white text-lg mb-0">HiFi</h1>
        <p>Get hired, find jobs</p>
      </div>
    </div>
  );
};

export default SideBar;
