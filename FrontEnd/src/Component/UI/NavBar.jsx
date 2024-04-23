import React,{useState} from 'react'
import {Box,Drawer,AppBar,CssBaseline,Toolbar,List,Typography,Tooltip,ListItem,ListItemButton,ListItemIcon,ListItemText, IconButton} from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu';
import Menus from './Menus'
import { DraweList } from '../Data/DrawerList';
import DrawerMenu from './DrawerMenu';
import { useNavigate } from 'react-router-dom';
const drawerWidth = 240
const NavBar = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [dropdawn,setDropdawn] = useState(false)
    const navigate = useNavigate()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const hanlDropdawn=()=>{
    setDropdawn(!dropdawn)
 }
 const handlDropdawnClose = ()=> {
    setDropdawn(false)
 }
  const drawer = (
    <div>
      <List>
        {DraweList.map((items) => (
          <React.Fragment key={items.id}>
            {
            items.Submenu ? <> 
          <ListItem disablePadding>
            <Tooltip  title={!open?`${items.Name}`:''} placement="right-end">
              <ListItemButton onClick={hanlDropdawn}>
                 <ListItemIcon>
                 {items.Icon}
                 </ListItemIcon>
                 <ListItemText primary={`${items.Name}`} />
             </ListItemButton>
           </Tooltip> 
         </ListItem>
         <DrawerMenu item={items.Submenu} Dropdawn={dropdawn} handlDropdawnClose={handlDropdawnClose}/>
         </> :
            <ListItem sx={{marginTop:'.5rem'}}  disablePadding>
             <Tooltip  title={!open?`${items.Name}`:''} placement="right-end">
               <ListItemButton onClick={()=>navigate(`${items.Path}`)} >
                  <ListItemIcon>
                  {items.Icon}
                  </ListItemIcon>
                  <ListItemText primary={`${items.Name}`} />
              </ListItemButton>
            </Tooltip>
          </ListItem>
         
           }
          </React.Fragment>
        ))}
      </List>
    </div>
  );
  return (
    <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,boxShadow:0 }}>
            <Toolbar sx={{boxShadow:0}}>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
            >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            ማውጫ
          </Typography>
              <Menus/>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders">
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,top:'51px' },
                }}>
              {drawer}
            </Drawer>
            <Drawer   open
               
                variant="permanent"
                sx={{ display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,top:'60px'}}}>
              {drawer}
            </Drawer>
        </Box>
        </Box>
      );
    }
export default NavBar