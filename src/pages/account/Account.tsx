import { useContext, useEffect, useState } from "react";
import "./Account.css";
import type { AccountData, BankData } from "../../types/util";
import authContext from "../../context/authContext";
import { FaEdit, FaTrash } from "react-icons/fa";

const Account: React.FC = () => {
  const url = import.meta.env.VITE_API_URL;
  const { user } = useContext(authContext);
  const [saldo, setSaldo] = useState(0);
  const [id, setId] = useState(0);
  const [bancoId,setBancoId] = useState(0);
  const [list, setList] = useState<AccountData[]>([]);
  const [listBank, setListBank] = useState<BankData[]>([]);

useEffect(() => {
    const loadList = async () => {
      try {
        const response = await fetch(`${url}/api/banco`, {
          headers: {
            authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setListBank([...data]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadList();
  }, []);

  useEffect(() => {
    const loadList = async () => {
      try {
        const response = await fetch(`${url}/api/conta`, {
          headers: {
            authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setList([...data]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadList();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const conta = { id,bancoId,saldo };
      const response = await fetch(`${url}/api/conta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(conta),
      });
      if (response.ok) {
        const data = await response.json();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="account-container">
      <div className="account-center">
        <form className="account-form" onSubmit={handleSubmit}>
          <h2>Cadastro de Contas</h2>
          <div>
            <label htmlFor="Banco">Banco</label>
            <select name="" id="" onBlur={(e)=> setBancoId(listBank[e.currentTarget.selectedIndex].id??0)}>
                {
                    listBank.map((item,i)=>{
                        return (
                            <option value={item.id??0} key={i}>
                                {item.nome}
                            </option>
                        )
                    })
                }
            </select>
            </div>
            <div>
                <label htmlFor="Saldo">Saldo inicial</label>
                <input
                type="numeric"
                id="Saldo"
                value={saldo}
                onChange={(e) => setSaldo(parseInt(e.target.value))}
                />

            </div>

          <button>Salvar</button>
        </form>
        <div className="account-table-content">
          <h4>Lista de Contas</h4>
          <table className="account-table">
            <thead>
              <tr>
                <th>Conta</th>
                <th>Banco</th>
                <th>Saldo</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((item: AccountData, i) => {
                return (
                  <tr key={i} onClick={()=>{setId(item.id??0);}}>
                    <td>{item.id}</td>
                    <td>{item.banco}</td>
                    <td>{new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(item.saldo??0)}</td>
                    <td><FaEdit/></td>
                    <td><FaTrash/></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Account;
