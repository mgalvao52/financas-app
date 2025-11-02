import { useContext, useEffect, useState } from "react";
import "./Bank.css";
import type { BankData } from "../../types/util";
import authContext from "../../context/authContext";
import { FaEdit, FaTrash } from "react-icons/fa";

const Bank: React.FC = () => {
  const url = import.meta.env.VITE_API_URL;
  const { user } = useContext(authContext);
  const [nome, setNome] = useState("");
  const [id, setId] = useState(0);
  const [list, setList] = useState<BankData[]>([]);

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
      const bank = { id, nome };
      const response = await fetch(`${url}/api/banco`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(bank),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
      console.log(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bank-container">
      <div className="bank-center">
        <form className="bank-form" onSubmit={handleSubmit}>
          <h2>Cadastro de Bancos</h2>
          <div>
            <label htmlFor="Nome">Nome</label>
            <input
              type="text"
              id="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <button>Salvar</button>
        </form>
        <div className="bank-table-content">
          <h4>Lista de Bancos</h4>
          <table className="bank-table">
            <thead>
              <tr>
                <th hidden></th>
                <th>Nome</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((item: BankData, i) => {
                return (
                  <tr key={i} onClick={()=>{setId(item.id??0);setNome(item.nome)}}>
                    <td hidden>{item.id}</td>
                    <td>{item.nome}</td>
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

export default Bank;
