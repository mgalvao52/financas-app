
import './App.css'
import AuthProvider from './context/AuthProvider'
import Login from './pages/login/Login'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Register from './pages/register/Register'
import PrivateRoute from './componets/private/PrivateRoute'
import PrivateLayout from './componets/private/PrivateLayout'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path='/resumo' element={
            <PrivateRoute>
              <PrivateLayout>
                <h1>Resumo</h1>
              </PrivateLayout>
            </PrivateRoute>
          } />
          <Route path='/transacoes' element={
            <PrivateRoute>
              <PrivateLayout>
                <h1>Transações</h1>   
              </PrivateLayout>
            </PrivateRoute>
          }/>
          <Route path='/contas' element={
            <PrivateRoute>
              <PrivateLayout>
                <h1>Contas</h1>
              </PrivateLayout>
            </PrivateRoute>
          }/>
          <Route path='/categorias' element={
            <PrivateRoute>
              <PrivateLayout>
                <h1>Categorias</h1>
              </PrivateLayout>
            </PrivateRoute>
          }/>
          <Route path='/bancos' element={
            <PrivateRoute>
              <PrivateLayout>
                <h1>Bancos</h1>
              </PrivateLayout>
            </PrivateRoute>
          }/>
          <Route path='*' element={<Login/>}/>  
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
