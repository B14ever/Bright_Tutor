import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Layout from './Component/Layout'
import './App.css'
import RequireAuth from './Features/auth/RequireAuth'
import Login from './Features/auth/Login'
import Setting from './Features/Users/Setting'
import Class from './Features/Class/Class'
import Course from './Features/Course/Course'
function App() {
  return (
    <Routes>
       <Route path='/' element={<Login/>}/>
         {/* protected routes */}
        <Route element={<RequireAuth  Autherazetion={["Registrar","Homeroom","Admin"]}/>}>
               <Route path="/dashboard" element={<Layout/>}>
               <Route path='setting' element={<Setting/>}/>
               <Route path='class' element={<Class/>}/> {/*admin*/}
               <Route path='course' element={<Course/>}/> {/*admin*/}
         </Route> 
        </Route>
    </Routes>
  )
}

export default App
