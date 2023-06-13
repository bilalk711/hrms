import LayoutView from "../views/Layout/Layout";
import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Layout = () => {
    const { user } = useAuth();
    if(user === null) return <Navigate to="/login"/>
    return <LayoutView/>;
};

export default Layout;