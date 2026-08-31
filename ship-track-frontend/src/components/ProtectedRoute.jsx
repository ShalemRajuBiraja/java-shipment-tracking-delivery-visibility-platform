import { Navigate } from "react-router-dom";
import { AUTH_CONFIG } from "../constants/baseUrl";

const ProtectedRoute = ({ children, allowedRole }) => {

    const token = localStorage.getItem(AUTH_CONFIG.TOKEN);

    const userData = JSON.parse(
        localStorage.getItem("userData")
    );

    // User is not logged in
    if (!token || !userData) {
        return <Navigate to="/home" replace />;
    }

    // User has wrong role
    if (userData.role !== allowedRole) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default ProtectedRoute;