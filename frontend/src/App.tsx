import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from "./pages/Register"
import Login from "./pages/Login"
import AdminDashboard from './component/admin/Dashboard'
import ClientDashboard from './component/client/Dashboard'
import ProviderDashboard from './component/provider/Dashboard'

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/provider" element={<ProviderDashboard />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
