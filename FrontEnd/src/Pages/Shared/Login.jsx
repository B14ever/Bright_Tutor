import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {Grid,Paper} from '@mui/material'
import LoginForm from '../../Component/Shared/LoginForm';
const Login = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
    <CssBaseline />
    <Grid item xs={false}  md={7}
      sx={{
        backgroundImage: '',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
    <Grid item xs={12}  md={5} component={Paper} elevation={6} square>
       <LoginForm/>
     </Grid>
    </Grid>
       
  )
}

export default Login