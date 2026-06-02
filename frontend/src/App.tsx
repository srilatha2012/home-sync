import { Route, Routes } from 'react-router-dom'
import './App.css'
import RegisterPage from "./pages/RegisterPage"
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={< LoginPage/>} />
      <Route path="/dashboard" element ={< DashboardPage/>}  />
    </Routes>
  )
}

export default App
