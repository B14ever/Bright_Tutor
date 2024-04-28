import React,{ useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from '../../Component/Shared/LoginForm'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../Features/Shared/Auth/authSlice'
import {Snackbar,Alert} from '@mui/material'
import { useLanguage } from '../../Features/Shared/Language/LanguageContext'

const Login = () => {
  const [alert,setAlert] = useState(false)
  const dispatch = useDispatch() 
  const location = useLocation();
  const {t} = useLanguage()
  const prevLocation = location.state && location.state.from
  useEffect(()=>{
    if(prevLocation?.pathname === '/recoverPassword'){
      dispatch(setCredentials({}))
      setAlert(true)
    }
  },[])
  return (
       <React.Fragment>
        <LoginForm/>  
        {alert && <Snackbar open={alert} anchorOrigin={{ vertical:'top', horizontal:'center'}} 
                 autoHideDuration={4000} onClose={()=>setAlert(false)}>
              <Alert 
                onClose={()=>setAlert(false)} severity="info" sx={{ width: '100%' }}>
                {t(`PasswordChanged`)}
              </Alert>
        </Snackbar>
}
       </React.Fragment> 
  )
}

export default Login