import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Breadcrumbs = ({ routes }) => {
    return (
        <div className="flex flex-row items-center py-2">
            {routes.map((route, index) =>
                <>
                    <NavLink end to={route.path} className={({isActive})=> `${isActive ? "text-gray-600" : "text-emerald-800 hover:text-gray-600" }`}>
                        {route.label}
                    </NavLink>
                    {index < (routes.length - 1) ? <IoIosArrowForward className="text-emerald-700"/> : null}
                </>
            )}
        </div>
    );
};

export default Breadcrumbs;