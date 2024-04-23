import React, { useState} from 'react'
import { Box,TextField,FormHelperText,Button,Divider,Typography,Alert} from '@mui/material'
import { useSecuritryMutation } from '../../Features/Users/userApiSlice'
const ChangePassword = () => {
  const [data,setData] = useState({Password:'',newPassword:'',confirmPassword:''})
  const [Errors,setErrors] = useState({Password:'',newPassword:'',confirmPassword:''})
  const [errorMsg,setErrorMsg] = useState('')
  const [success,setSuccess] = useState(false)
  const [securit] = useSecuritryMutation()
  const handleChange = (e) =>{
    const {name,value} = e.target
    setData({...data,[name]:value})
    setErrors({...Errors,[name]:null})
  }
  const handleSubmit = async (e) =>{
    e.preventDefault()
    setErrorMsg('')
    setErrors('')
    const errors = validateForm()
    if (Object.keys(errors).length === 0) {
      try {
        await securit(data).unwrap()
        setSuccess(true)
        setData('')
        } catch (err) {
           if (!err?.response) {
            setSuccess(false)
             setErrorMsg('የይለፍ ቃል መቀየር አልተሳካም');
           } else if (err.response?.status === 409) {
             setSuccess(false)
             setErrorMsg(err.response.data.error);
           } else if (err.response?.status === 403){
             setSuccess(false)
             setErrorMsg(err.response.data.error)
           }
       }
     } else {
        setErrors(errors);
       }
  }
  const validateForm =()=>{
    const formsErrors ={}
    if(!data.Password){
      formsErrors.Password = 'የይለፍ ቃል ማስገባት አለቦት'
    }
    if(!data.newPassword){
      formsErrors.newPassword = 'አዲስ የይለፍ ቃል ማስገባት አለቦት'
    }
    if(!data.confirmPassword){
      formsErrors.confirmPassword = 'አዲስ የይለፍ ቃል ማረጋገጫ ማስገባት አለቦት'
    }
    if( data.confirmPassword !== data.newPassword){
      formsErrors.confirmPassword = 'አዲስ የይለፍ ቃል ማረጋገጫ ልክ አይደለም'
    }
  return formsErrors
  }
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{display:'flex',flexDirection:'column',gap:'.5rem',alignItems:'center'}}mt={2}ml={2}mr={2}>
      <TextField sx={{width:{xs:'100%',md:'50%'}} } value={data.Password || ''} onChange={handleChange} label={"የይለፍ ቃሎን ያስገቡ"} type='password' name="Password" />
      <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.Password?`${Errors.Password}`:''}</FormHelperText>
      <TextField sx={{width:{xs:'100%',md:'50%'}}} value={data.newPassword || ''} onChange={handleChange} label={"አዲስ የይለፍ ቃል"} type='password' name="newPassword" />
      <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.newPassword?`${Errors.newPassword}`:''}</FormHelperText>
      <TextField sx={{width:{xs:'100%',md:'50%'}}} value={data.confirmPassword || ''} onChange={handleChange} label={"የይለፍ ቃል ያረጋግጡ"} type='password' name="confirmPassword"/>
      <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.confirmPassword?`${Errors.confirmPassword}`:''}</FormHelperText>
      {success?<Alert severity='info' sx={{width:{xs:'100%',md:'50%'}}}>{"የይለፍ ቃል  በተሳካ ሁኔታ ተቀይሮል"}</Alert>:''}
      {errorMsg?<Alert severity='error' sx={{width:{xs:'100%',md:'50%'}}}>{`${errorMsg}`}</Alert>:''}
        <Box sx={{width:{xs:'100%',md:'50%'},display:'flex',justifyContent:'flex-end',marginBottom:'1rem'}}>
          <Button type="submit"  variant="contained" size='large' sx={{width:{xs:'100%',sm:'50%'}}}>ቀይር</Button>
        </Box>
    </Box>
  )
}

export default ChangePassword