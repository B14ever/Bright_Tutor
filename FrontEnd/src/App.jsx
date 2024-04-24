import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import RequireAuth from './Features/Shared/Auth/RequireAuth'
import Home from './Pages/Shared/Home'
import Login from './Pages/Shared/Login'
import Layout from './Component/Shared/Layout'
function App() {
  return (
    <Routes> 
       <Route path="/" element={<Layout/>}>
         <Route index element={<Home/>}/>
         <Route path='/login' element={<Login/>}/>
       </Route> 
         {/* protected routes */}
        <Route element={<RequireAuth  Autherazetion={["Registrar","Homeroom","Admin"]}/>}>
               
        </Route>
    </Routes>
  )
}

export default App
