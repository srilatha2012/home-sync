import { Route, Routes } from 'react-router-dom'
import './App.css'
import RegisterPage from "./pages/RegisterPage"
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import Navbar from './components/landing/Navbar'
import Footer from './components/landing/Footer'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={< LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              < DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
       <Footer />
    </>
  )
}

export default App
