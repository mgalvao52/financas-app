import React, { useContext, useEffect, useRef, useState } from "react";
import type { AccountData, CategoryData } from "../../types/util";
import "./Transaction.css";
import authContext from "../../context/authContext";

const Transaction: React.FC = () => {
  const url = import.meta.env.VITE_API_URL;
  const { user } = useContext(authContext);
  const [descricao, setDescricao] = useState<string>();
  const [valor, setValor] = useState<number>();
  const [tipo, setTipo] = useState<string>("entrada");
  const [contaId, setContaId] = useState<number>();
  const [categoriaId, setCategoriaId] = useState<number>();
  const [listAccount, setListAccount] = useState<AccountData[]>([]);
  const listType = useRef(['entrada','saida']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const transaction = {descricao,tipo,contaId,categoriaId,valor};
      console.log(transaction);
      const response =await fetch(`${url}/api/transacao`,{
        method:"POST",
        headers:{
          "Content-Type":'application/json',
          "Authorization":`Bearer ${user.token}`
        },
        body: JSON.stringify(transaction)
      })
      if(response.ok){
        alert("transação cadastrada com sucesso");
      }else{
        alert("erro ao cadastrar transação")
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const [listCategory, setListCategory] = useState<CategoryData[]>([]);

  useEffect(() => {
    const loadList = async () => {
      try {
        const response = await fetch(`${url}/api/categoria`, {
          headers: {
            authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setListCategory([...data]);
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
          setListAccount([...data]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadList();
  }, []);

  return (
    <div className="transaction-container">
      <div className="transaction-center">
        <form className="transaction-form" onSubmit={handleSubmit}>
          <h2>Cadastro de Transações</h2>
          <div>
            <label htmlFor="descricao">Descrição</label>
            <input type="text" name="" id="descricao" onChange={(e)=>setDescricao(e.target.value)} />
          </div>
          <div>
            <label htmlFor="tipo">Tipo</label>
            <select
              name=""
              id="tipo"
              onBlur={(e) =>
                setTipo(listType.current[e.currentTarget.selectedIndex-1])
              }
            >
                <option value={0} key={0}>
                    {'selecione um tipo'}
                  </option>
              {listType.current.map((item, i) => {
                return (
                  <option value={item ?? ""} key={i}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="conta">Conta</label>
            <select
              name=""
              id="conta"
              onBlur={(e) =>
                setContaId(listAccount[e.currentTarget.selectedIndex-1].id ?? 0)
              }
            >
                <option value={0} key={0}>
                    {'selecione uma conta'}
                  </option>
              {listAccount.map((item, i) => {
                return (
                  <option value={item.id ?? 0} key={i}>
                    {item.banco}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="categoria">Categoria</label>
            <select
              name=""
              id="categoria"
              onBlur={(e) =>
                setCategoriaId(listCategory[e.currentTarget.selectedIndex-1].id ?? 0)
              }
            >
                <option value={0} key={0}>
                    {'selecione uma categoria'}
                  </option>
              {listCategory.map((item, i) => {
                return (
                  <option value={item.id ?? 0} key={i}>
                    {item.nome}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="valor">Valor</label>
            <input type="numeric" name="" id="valor"  onChange={(e)=>setValor(parseFloat(e.target.value))}/>
          </div>
          {/* <div>
                <label htmlFor="Saldo">Saldo inicial</label>
                <input
                type="numeric"
                id="Saldo"
                value={saldo}
                onChange={(e) => setSaldo(parseInt(e.target.value))}
                />

            </div> */}

          <button>Salvar</button>
        </form>
        {/* <div className="account-table-content">
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
        </div> */}
      </div>
    </div>
  );
};

export default Transaction;
