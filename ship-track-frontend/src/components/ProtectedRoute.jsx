import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {

    const token = localStorage.getItem("token");

    const userDataString = localStorage.getItem("userData");

    // User is not logged in
    if (!token || !userDataString) {
        return <Navigate to="/home" replace />;
    }

    const userData = JSON.parse(userDataString);

    // User role doesn't have permission
    if (userData.role !== allowedRole) {
        return <Navigate to="/home" replace />;
    }

    // User is authorized
    return children;
};

export default ProtectedRoute;