import { useContext} from "react";
import { Navigate } from "react-router-dom";
import authContext from "../../context/authContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useContext(authContext);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;