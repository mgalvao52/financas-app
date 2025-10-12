import SideBar from "../SideBar";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: "flex" }}>
        <SideBar /> 
        <main style={{ flex: 1 }}>{children}</main>
    </div>
);
export default PrivateLayout;