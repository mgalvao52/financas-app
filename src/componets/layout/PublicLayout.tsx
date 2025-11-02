import { FaChartPie } from "react-icons/fa";
import "./PublicLayout.css";
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="public-layout-container">
      <div className="public-layout-content">
        <div className="public-layout-header">
          <h1>
            <FaChartPie style={{ marginRight: "8px" }} /><span>Finanças App</span>
          </h1>
        </div>
        <main style={{ flex: 1,display:'flex',justifyContent:'center',alignItems:'center',minHeight:'80vh' }}>{children}</main>
      </div>
    </div>
  );
};

export default PublicLayout;
