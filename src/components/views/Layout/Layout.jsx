import { Outlet } from "react-router";
import Clock from "../components/Clock";
import SideMenu from "./SideMenu";

const LayoutView = () => {
    return <div className="relative w-screen">
                <div className="p-2 flex absolute top-0 left-0 w-full h-12 bg-white border-solid border border-transparent border-b-slate-200">
                    <Clock/>
                </div>
                <div className="flex flex-column">
                    <SideMenu/>
                    <div className="pt-12 flex-1 relative">
                        <Outlet/>
                    </div>
                </div>
            </div>
}

export default LayoutView;