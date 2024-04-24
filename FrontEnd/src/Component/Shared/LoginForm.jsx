import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../Features/Shared/Auth/authSlice'
import { useLoginMutation } from '../../Features/Shared/Auth/authApiSlice'
import {styled} from '@mui/material/styles'
import {Avatar,Button,TextField,Box,Typography, FormControl, FormHelperText} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const FormContainer = styled(Box) (({theme})=> ({
     marginTop:'2.9rem',
     padding: '1rem',
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',

}))

const LoginForm = () => {
  const userRef = useRef()
    const errRef = useRef()
    const [Email, setUser] = useState('')
    const [Password, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [Errors,setErrors] = useState({Email:'',Password:''})
   
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()
    useEffect(() => {
        setErrMsg('')
    }, [Email, Password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
        try {
            const userData = await login({ Email, Password }).unwrap()
            dispatch(setCredentials({ ...userData}))
            setUser('')
            setPwd('')
            navigate('/dashboard')
        } catch (err) {
          console.log(err)
            if (!err) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');  
            } else if (err.status === 401) {
                setErrMsg(err.data);
            } else {
                setErrMsg('Login Failed');
            }
           
        }
      } else {
        setErrors(errors);
      }
    }


    const handleUserInput = (e) => {
          setErrors({...Errors,Email:''})
          setUser(e.target.value)
        }

    const handlePwdInput = (e) =>{
       setErrors({...Errors,Password:''})
       setPwd(e.target.value)
      }

    const validateForm = () => {
      const formErrors = {};
      if (!Email) {
          formErrors.Email = 'የይለፍ ቃል አላስገቡም';
        } 
        if (!Password) {
          formErrors.Password = 'የሚስጥር ቃል አላስገቡም';
        }   
      return formErrors;
  }
  
  return (
           <FormContainer>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              እንኮን ደና መጡ
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl fullWidth error={!!Errors.Email}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="የይለፍ ቃል ያስገቡ"
                name="email"
                autoComplete="email"
                autoFocus
                value={Email}
                onChange={handleUserInput}
              />
              <FormHelperText>{Errors.Email?Errors.Email:''}</FormHelperText>
              </FormControl>
              <FormControl fullWidth error={!!Errors.Password}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="የሚስጥር ቃል ያስገቡ"
                type="password"
                id="password"
                autoComplete="current-password"
                value={Password}
                onChange={handlePwdInput}
              />
              <FormHelperText>{Errors.Password?Errors.Password:''}</FormHelperText>
              </FormControl>
              {errMsg && <Typography sx={{color:"#DA0037"}}>{errMsg}</Typography>}
            <Box sx={{display:'flex',justifyContent:'center'}}>
            <Button
                type="submit"
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2}}
                fullWidth
              >
               ይግቡ
              </Button>
            </Box>
            
         
             
            </Box>
          </FormContainer>
     
  
  );
}
export default LoginForm