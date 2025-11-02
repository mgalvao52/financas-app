import { useContext } from "react";
import SideBar from "../SideBar";
import authContext from "../../context/authContext";
import './PrivateLayout.css';

const PrivateLayout = ({ children }: { children: React.ReactNode }) =>
{
   const {user,logout} = useContext(authContext); 
   return (
    <div className="private-layout-container">
        <SideBar /> 
        <div className="private-layout-content" >
            <div className="private-layout-header">
                <h2 style={{color:"#333"}}>{window.location.pathname.slice(1)}</h2>
                <ul >
                    <li>Olá {user.nome}</li>
                    <li >
                        <input type="button" value="Sair" onClick={logout}/>
                    </li>
                </ul>

            </div>
            <main style={{ flex: 1 }}>{children}</main>
        </div>
    </div>
)};
export default PrivateLayout;