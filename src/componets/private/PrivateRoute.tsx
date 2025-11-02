import { useContext} from "react";
import { Navigate, useLocation } from "react-router-dom";
import authContext from "../../context/authContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { user,loading } = useContext(authContext);
    const location = useLocation();
    if(loading) {
        return <div>Loading...</div>; 
    }
    if(!user || !user.isAuthenticated) {
        return <Navigate to="/login" state={{from: location}} replace />;
    }
    return children;
};

export default PrivateRoute;