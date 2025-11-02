import { PiWalletBold, PiWalletFill, PiWalletThin } from "react-icons/pi";
import "./DashBoard.css";
import { useContext, useEffect, useState } from "react";
import authContext from "../../context/authContext";

interface Transacao{
    data:string,
    valor:number,
    tipo:'entrada'|'saida',
    descricao:string,
    categoria:string
}
interface Resumo{
    entradas:number|null,
    saidas:number|null,
    saldo:number
}

const DashBoard: React.FC = () => {
   const {user} = useContext(authContext);
  const [transacoes,setTransacoes] = useState<Transacao[]>([])
  const [resumo,setResumo] = useState<Resumo>();
 const url = import.meta.env.VITE_API_URL;
  useEffect(()=>{
    
      const loadList = async ()=>{
          try {
             let response = await fetch(url+"/api/transacao",{headers:{
                "authorization":`Bearer ${user.token}`,
                "Content-Type":"application/json"
             }});
             if(response.ok){
                 const data = await response.json();  
                 console.log(data);
                 if(data && data.length > 0){
                     setTransacoes([...data.map((item:any)=>{
                        return {
                            data: new Date(item.data).toLocaleString(),
                            tipo:item.tipo,
                            valor:new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(item?.valor??0),
                            descricao:item.descricao.toLowerCase(),
                            categoria:item.categoria.nome.toLowerCase()
                        }
                     })]);  

                 }               
             }
 
          } catch (error) {
             console.log(error)
          }

      }

      const loadResumo = async ()=>{
        try {
             let date = new Date();
             let response = await fetch(url+`/api/relatorio/resumo-mensal/${date.getMonth()+1}/${date.getFullYear()}`,{headers:{
                "authorization":`Bearer ${user.token}`,
                "Content-Type":'application/json'
             }});
             
             if(response.ok){
                 const data = await response.json();
                 setResumo(data);  
             }
 
          } catch (error) {
             console.log(error)
          }
      }
      loadResumo();
      loadList();
     
  },[])
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-center">
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>
              <PiWalletFill /> <span>Total Receitas</span> 
            </h3>
            <p style={{color:'green'}}>{ new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(resumo?.entradas??0)} </p>
          </div>
          <div className="dashboard-card">
            <h3>
              <PiWalletThin /><span>Total Despesas</span> 
            </h3>
            <p style={{color:'red'}}>{ new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(resumo?.saidas??0)}</p>
          </div>
          <div className="dashboard-card">
            <h3>
              <PiWalletBold /><span>Saldo Total</span> 
            </h3>
            <p>{ new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(resumo?.saldo??0)}</p>
          </div>
        </div>
        {transacoes.length> 0?
        <div className="dashboard-transactions">
          <h3>Transações Recentes</h3>
          <table className="dashboard-transactions-table">
            <thead>
              <tr>
                <th>Valor</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Tipo</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
                {
                   transacoes.map((item:Transacao,i)=>{                         
                       return(
                        <tr key={i} style={{color:(item.tipo === 'entrada'?'green':'red'),fontWeight:'500'}}>
                            <td>{item.valor}</td>
                            <td>{(item.descricao.length > 30?item.descricao.substring(0,30)+'...':item.descricao)}</td>
                            <td>{item.categoria}</td>
                            <td>{item.tipo}</td>
                            <td>{item.data}</td>
                        </tr>
                       )
                    })
                }
            </tbody>
          </table>
        </div>
        :<></>
        }
      </div>
    </div>
  );
};

export default DashBoard;
