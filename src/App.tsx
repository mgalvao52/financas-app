import "./App.css";
import AuthProvider from "./context/AuthProvider";
import Login from "./pages/login/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/register/Register";
import PrivateRoute from "./componets/private/PrivateRoute";
import PrivateLayout from "./componets/private/PrivateLayout";
import DashBoard from "./pages/dashboard/DashBoard";
import PublicLayout from "./componets/layout/PublicLayout";
import Bank from "./pages/bank/Bank";
import Category from "./pages/category/Category";
import Account from "./pages/account/Account";
import Transaction from "./pages/transaction/Transaction";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={
            <PublicLayout>
              <Login />
            </PublicLayout>
            } />
          <Route path="/registrar" element={
            <PublicLayout>
              <Register />
            </PublicLayout>
            } />
          <Route
            path="/resumo"
            element={
              <PrivateRoute>
                <PrivateLayout>
                 <DashBoard />
                </PrivateLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/transacoes"
            element={
              <PrivateRoute>
                <PrivateLayout>
                  <Transaction/>
                </PrivateLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/contas"
            element={
              <PrivateRoute>
                <PrivateLayout>
                  <Account/>
                </PrivateLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/categorias"
            element={
              <PrivateRoute>
                <PrivateLayout>
                  <Category/>
                </PrivateLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/bancos"
            element={
              <PrivateRoute>
                <PrivateLayout>
                  <Bank/>
                </PrivateLayout>
              </PrivateRoute>
            }
          />
          <Route path="*" element={ 
            <PublicLayout>
              <Login />
            </PublicLayout>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
