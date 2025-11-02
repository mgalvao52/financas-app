import { useContext,useState } from "react";
import authContext from "../../context/authContext";
import './Login.css';
import { Link } from "react-router-dom";
import { FaUserLock } from "react-icons/fa";

const Login: React.FC = () => {
    const {login} = useContext(authContext);
    const [senha,setSenha] = useState("");
    const [email,setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user = { email, senha };
        const url = import.meta.env.VITE_API_URL + "/api/usuario/login";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(async response => {
            if (response.ok) {
                const data = await response.json();
                login({isAuthenticated:true,nome:data.nome,email,token:data.token});
            }
            else {
                alert("Erro ao fazer login!");
            }
        }).catch(err => {
            console.error("Erro ao fazer login: ", err);
        });
        
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2><FaUserLock style={{fontSize:'2.1rem'}}/><span>Entre com seu dados</span></h2>
            <div >
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </div>
            <button type="submit">Login</button>
            <p>Não tem conta? <Link to={'/registrar'}> Registre-se</Link> </p>
        </form>
    );
}
export default Login;