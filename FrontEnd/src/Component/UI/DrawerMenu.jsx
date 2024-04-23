import React,{useState,useEffect,useRef} from 'react'
import { Tooltip,ListItem,ListItemIcon,ListItemText,ListItemButton,Collapse,ClickAwayListener} from '@mui/material'
import {useNavigate} from  'react-router-dom'
const DrawerMenu = ({item,Dropdawn}) => {
 
  const navigate = useNavigate()
  return (
      
         <Collapse in={Dropdawn}  timeout="auto">
            {
               item.map((list)=>{
                return <ListItem key={list.id} disablePadding>
                  <Tooltip  title={`${list.Name}`} placement="right-end">
                   <ListItemButton onClick={()=>navigate(`${list.Path}`)} >
                   <ListItemIcon>
                     {list.Icon}
                   </ListItemIcon>
                   <ListItemText primary={`${list.Name}`} />
                   </ListItemButton>
                   </Tooltip>
                 </ListItem>
            
             })
            }
         </Collapse>
        
  )
}

export default DrawerMenu