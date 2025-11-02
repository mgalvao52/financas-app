import { Link } from 'react-router-dom';
import './SideBar.css';
import { FaChartLine, FaChartPie } from 'react-icons/fa';
import { MdAccountBalance } from 'react-icons/md';
import { BiCategory, BiSolidUserAccount } from 'react-icons/bi';
import { GrTransaction } from 'react-icons/gr';
const SideBar: React.FC = () => {
    return (
        <div className='sidebar-container'>
            <nav>   
                <h1>
                    <FaChartPie style={{marginRight:"8px"}} /> <span>Finanças App</span></h1>
                <Link to="/Resumo"><FaChartLine style={{marginRight:"15px"}}/> Resumo</Link>
                <Link to="/Transacoes"><GrTransaction style={{marginRight:"15px"}}/> Transações</Link>
                <Link to="/Contas"><BiSolidUserAccount style={{marginRight:"15px"}}/> Contas</Link>
                <Link to="/Categorias"><BiCategory style={{marginRight:"15px"}}/> Categorias</Link>
                <Link to="/Bancos"><MdAccountBalance style={{marginRight:"15px"}}/>Bancos</Link>
            </nav>

        </div>
    );
}
export default SideBar;