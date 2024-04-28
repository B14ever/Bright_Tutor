import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import RequireAuth from './Features/Shared/Auth/RequireAuth'
import Home from './Pages/Shared/Home'
import Login from './Pages/Shared/Login'
import Layout from './Component/Shared/Layout'
import CustomerDashboard from './Pages/Customers/CustomerDashboard'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import TutorDashboard from './Pages/Tutor/TutorDashboard'
import ForgetPassword from './Pages/Shared/ForgetPassword'
import EmailVerification from './Pages/Shared/EmailVerification'
import RecoverPassword from './Pages/Shared/RecoverPassword'
function App() {
  return (
    <Routes> 
       <Route path="/" element={<Layout/>}>
         <Route index element={<Home/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path="/forgetPassword" element={<ForgetPassword/>}/>
         {/* protected routes */}
        <Route element={<RequireAuth  Autherazetion={["Admin","Tutors","Customer"]}/>}>
          <Route path="/emailverification" element={<EmailVerification/>}/>
          <Route path="/recoverPassword" element={<RecoverPassword/>}/>    
        </Route>
        <Route element={<RequireAuth  Autherazetion={["Admin"]}/>}>
          <Route path="/admin" element={<AdminDashboard/>}/>
        </Route>
        <Route element={<RequireAuth  Autherazetion={["Tutors"]}/>}>
           <Route path="/tutors" element={<TutorDashboard/>}/>    
        </Route>
        <Route element={<RequireAuth  Autherazetion={["Customer"]}/>}>
          <Route path="/customers" element={<CustomerDashboard/>}/> 
        </Route>
      </Route> 
    </Routes>
  )
}

export default App
