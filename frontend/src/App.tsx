// import 'primereact/resources/themes/lara-light-blue/theme.css'
// import 'primereact/resources/primereact.min.css'
// import 'primeicons/primeicons.css'

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Register from "./pages/Register"
// import Login from "./pages/Login"
// import AdminDashboard from './component/admin/Dashboard'
// import ClientDashboard from './component/client/Dashboard'
// import ProviderDashboard from './component/provider/Dashboard'

// function App() {

//   return (
//     <>
//       <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/client" element={<ClientDashboard />} />
//         <Route path="/provider" element={<ProviderDashboard />} />
//       </Routes>
//     </Router>
//     </>
//   )
// }

// export default App

import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register"
import Login from "./pages/Login"
import AdminDashboard from './component/admin/Dashboard'
import ClientDashboard from './component/client/Dashboard'
import ProviderDashboard from './component/provider/Dashboard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/admin" element={<AdminDashboard />} />
         <Route path="/client" element={<ClientDashboard />} />
         <Route path="/provider" element={<ProviderDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
