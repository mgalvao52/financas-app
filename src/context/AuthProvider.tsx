import React,{useState} from "react";
import authContext from "./authContext";

const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(true);    

    const login = () => {
        setIsAuthenticated(true);
        console.log("login");
    }
    const logout = () => {
        setIsAuthenticated(false);
        console.log("logout");
    }
    return (
        <authContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </authContext.Provider>
    )

}
export default AuthProvider;