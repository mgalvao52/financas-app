import React, { useState } from 'react';
import './Register.css';
import { FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Register: React.FC = () => {
    const [nome,setNome] = useState("");
    const [senha,setSenha] = useState("");
    const [email,setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user = {nome, email, senha};
        console.log(user);
        const url = import.meta.env.VITE_API_URL + "/api/usuario";
        console.log("URL: ", url);
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response => {
            if (response.ok) {
                alert("Usuário cadastrado com sucesso!");
                setNome("");
                setEmail("");
                setSenha("");
            }
            else {
                console.log("Response not ok: ", response.body);
                alert("Erro ao cadastrar usuário!");
            }
        }).catch(err => {
            console.error("Erro ao cadastrar usuário: ", err);
        });
    }
    return (
       <form onSubmit={handleSubmit} className='register-form'>
            <h2><FaUserPlus style={{fontSize:'2.1rem'}}/><span>Crie sua conta</span></h2>
            <div>
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />  
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="senha">Senha:</label>   
                <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </div>
            <button type="submit">Registrar</button> 
            <p>Já tem conta? <Link to={'/login'}>Entre</Link> </p>
       </form>
    );
}

export default Register;
