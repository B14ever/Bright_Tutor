import React from 'react'
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import {  useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {logOut} from '../../Features/auth/authSlice'
import {clearPersistedState} from '../../app/Store'
import SettingsIcon from '@mui/icons-material/Settings'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import HomeIcon from '@mui/icons-material/Home';
import { deepOrange, deepPurple } from '@mui/material/colors';

const Menus = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const handleLogout = () => {
       dispatch(logOut)
       clearPersistedState()
       location.reload()
    }

    return (
        <Box sx={{ marginLeft:'auto' }}>
        <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="U" sx={{bgcolor: deepPurple[500]}} />
        </IconButton>
        </Tooltip>
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}>
             <MenuItem  onClick={()=>navigate('/dashboard')}>
               <Avatar sx={{width: 30, height: 30,marginRight:'.5rem'}}>
                    <HomeIcon/>
               </Avatar>
                <Typography textAlign="center">መነሻ</Typography>
             </MenuItem>
             <MenuItem  onClick={()=>navigate('setting')}>
               <Avatar sx={{width: 30, height: 30,marginRight:'.5rem'}}>
                    <SettingsIcon/>
               </Avatar>
                <Typography textAlign="center">የግል ማህደር</Typography>
             </MenuItem>
             <MenuItem  onClick={handleCloseUserMenu}>
               <Avatar sx={{width: 30, height: 30,marginRight:'.5rem'}}>
                      <ExitToAppIcon/>
                </Avatar>
                <Typography textAlign="center" onClick={handleLogout}>ዘግተው ይውጡ</Typography>
             </MenuItem>
        </Menu>
    </Box>
    )
}

export default Menus