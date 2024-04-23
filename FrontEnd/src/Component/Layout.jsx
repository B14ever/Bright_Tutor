import React from 'react'
import { Box } from '@mui/material'
import NavBar from './UI/NavBar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
        <NavBar/>
        <Box sx={{flexGrow: 1,backgroundColor:'#E8EFFA',height:'100vh',width:`calc(100% - ${240}px)`}}>
          <Outlet />
        </Box>
    </Box>
       
   
  )
}

export default Layout