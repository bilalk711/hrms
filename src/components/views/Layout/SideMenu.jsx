import { NavLink } from "react-router-dom";
import { BsFillRocketFill, BsPersonVcardFill, BsSpeedometer2, BsFileText } from "react-icons/bs";

const sideMenuItems = [
  {
    path: "/",
    icon: <BsSpeedometer2 size={24} />,
    title: "Dashboard",
  },
  {
    path: "/employees",
    icon: <BsPersonVcardFill size={24} />,
    title: "Employees",
  },
  {
    path: "/leaves",
    icon: <BsFillRocketFill size={24} />,
    title: "Leaves",
  },
  {
    path: "/payrolls",
    icon: <BsFileText size={24} />,
    title: "Payrolls",
  },
];

const SideMenu = () => {
  return (
    <div className="container w-80 h-screen bg-emerald-700 flex flex-col pt-12">
      {sideMenuItems.map(({ path, icon, title }) => (
        <NavLink
          key={path}
          className={({ isActive, isPending }) =>
            `flex flex-column text-white item-center font-semibold text-center w-full p-4 hover:bg-emerald-800 ${
              isActive ? "bg-emerald-800" : ""
            }`
          }
          to={path}
        >
          {icon}
          <span className="ml-4">{title}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default SideMenu;
