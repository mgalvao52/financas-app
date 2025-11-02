import { useContext, useEffect, useState } from "react";
import './Category.css';
import type { CategoryData } from "../../types/util";
import authContext from "../../context/authContext";
import { FaEdit, FaTrash } from "react-icons/fa";

const Category: React.FC = () => {
  const url = import.meta.env.VITE_API_URL;
  const { user } = useContext(authContext);
  const [nome, setNome] = useState("");
  const [id, setId] = useState(0);
  const [list, setList] = useState<CategoryData[]>([]);

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
      const category = { id, nome };
      const response = await fetch(`${url}/api/categoria`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(category),
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
    <div className="category-container">
      <div className="category-center">
        <form className="category-form" onSubmit={handleSubmit}>
          <h2>Cadastro de Categorias</h2>
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
        <div className="category-table-content">
          <h4>Lista de Categorias</h4>
          <table className="category-table">
            <thead>
              <tr>
                <th hidden></th>
                <th>Nome</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((item: CategoryData, i) => {
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

export default Category;
