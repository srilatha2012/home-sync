import { Route, Routes } from 'react-router-dom'
import './App.css'
import RegisterPage from "./pages/RegisterPage"
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={< LoginPage/>} />
      <Route 
         path="/dashboard" 
         element ={
        <ProtectedRoute>
          < DashboardPage/>
          </ProtectedRoute>
         }  
        />
    </Routes>
  )
}

export default App
