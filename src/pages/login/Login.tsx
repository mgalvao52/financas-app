import { useContext,useState } from "react";
import authContext from "../../context/authContext";
import './Login.css';

const Login: React.FC = () => {
    const {login} = useContext(authContext);
    const [senha,setSenha] = useState("");
    const [email,setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user = { email, senha };
        console.log(user);
        const url = import.meta.env.VITE_API_URL + "/api/usuario/login";
        console.log("URL: ", url);
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(async response => {
            if (response.ok) {
                const data = await response.json();
                console.log("Login successful: ", data);
                login();
            }
            else {
                console.log("Response not ok: ", response.body);
                alert("Erro ao fazer login!");
            }
        }).catch(err => {
            console.error("Erro ao fazer login: ", err);
        });

        
        login();
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            <div >
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}
export default Login;