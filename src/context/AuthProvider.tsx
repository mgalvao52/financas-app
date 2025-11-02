import React,{useEffect, useState} from "react";
import authContext from "./authContext";
import type { User } from "../types/util";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken{
    exp:number,
    id:number
}

const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {    
    const [user,setUser] = useState<User>({isAuthenticated:false,nome:"",email:"",token:"",id:0});
    const [loading,setLoading] = useState<boolean>(true);
    const location  = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const storeUser = localStorage.getItem("user");

        if(storeUser){
            const dataUser = JSON.parse(storeUser);
            if(!isExpiredToken(dataUser.token)){
                setUser(dataUser);
            }else{
                logout();
            }
        }
        setLoading(false);
    }, []);

    const isExpiredToken = (token:string|null)=>{
        if(!token){
            return true;
        }
        try {
            const currentTime = Date.now() /1000;
            const dataToken = jwtDecode<DecodedToken>(token);
            return dataToken.exp < currentTime;
            
        } catch (error) {
            return true
        }
    }

    const from = location.state?.from?.pathname || "/resumo";
    const login = (userData:User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate(from, { replace: true });
    }
    const logout = () => {
        setUser({email:"",nome:"",token:"",isAuthenticated:false});
        localStorage.removeItem("user");
    }
    return (
        <authContext.Provider value={{user, login, logout,loading}}>
            {children}
        </authContext.Provider>
    )

}
export default AuthProvider;