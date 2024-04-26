import { AppBar, Toolbar, Typography,Grid,Box,Button,Menu,MenuItem} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate,useLocation } from 'react-router-dom'
import { useState} from 'react';
import { useLanguage } from '../../Features/Shared/Language/LanguageContext';
import Languagebtn from './Languagebtn'
const HomeNavBar = () => {
    const {t,i18n} = useLanguage()
    const navigate = useNavigate()
    const location = useLocation()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    }
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    }
  return (
        <AppBar sx={{backgroundColor:'#fff',boxShadow:'none'}} component="nav">
        <Toolbar variant='dense' sx={{boxShadow:'none',background: '#1e88e5'}}>
                <Grid sx={{placeItems:'center'}} container>
                    <Grid xs={4} sm={6}  item>
                        <Typography  sx={{textAlign:'left',color:'#fff',fontSize:{xm:'1.3rem',sm:'1.3rem'}}}>Bright Tutor</Typography>
                    </Grid>
                    {
                    (location.pathname === '/')?
                    <Grid sm={6} xs={8}  item>
                        <Box  sx={{ display: { display:'flex' } }}>
                            <Languagebtn/>
                            <Button   onClick={()=>navigate('/login')} sx={{color:'#fff',textTransform:'none'}}>{t("Log in")}</Button>
                            <Button  onClick={()=>navigate('/signup')} sx={{color:'#fff',textTransform:'none'}} >{t("Sign up")}</Button>
                         </Box>
                    </Grid>:
                    <Grid xs={4}sm={6}  item ><Box sx={{display:'flex',justifyContent:'flex-end'}}><Languagebtn/></Box></Grid>
                    }
                </Grid>
        </Toolbar>
        </AppBar>
  )
}

export default HomeNavBar