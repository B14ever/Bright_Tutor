import { Outlet } from "react-router-dom";
import React from "react";
import HomeNavBar from "./HomeNavBar";
const Layout = () => {
  return( <React.Fragment>
             <HomeNavBar/>
             <Outlet/>
          </React.Fragment>
  )
          
}

export default Layout