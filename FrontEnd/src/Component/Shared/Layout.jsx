import { Outlet } from "react-router-dom";
import React from "react";
import HomeNavBar from "./HomeNavBar";
import Footer from './Footer'
const Layout = () => {
  return( <div className="flex flex-col min-h-screen">
             <HomeNavBar/>
             <main className="flex-grow mb-5"><Outlet/></main>
             
             <Footer/>
           </div>
  )
          
}

export default Layout