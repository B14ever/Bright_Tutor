import { useEffect, useState }  from 'react'
import { Box,TextField,Snackbar,Backdrop,CircularProgress,Alert,FormHelperText,Divider, Grid,Button} from '@mui/material'
import {useSelector,useDispatch}  from 'react-redux'
import { selectCurrentUser,selectCurrentToken } from '../../Features/auth/authSlice'
import { setCredentials } from '../../Features/auth/authSlice'
// RTQ query
import { usePrefernceMutation } from '../../Features/Users/userApiSlice'

const UpdateUserInfo = () => {
    const [prefernce] = usePrefernceMutation()
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const token =useSelector(selectCurrentToken)
  const [data,setData] = useState({FirstName:`${user.FirstName}`,MiddleName:`${user.MiddleName}`,LastName:`${user.LastName}`,
  Email:`${user.Email}`,FatherOfRepetance:`${user.FatherOfRepetance}`,ChristianName:`${user.ChristianName}`})
  const [Errors, setErrors] = useState({FirstName:false,MiddleName:false,LastName:false,ChristianName:false,FatherOfRepetance:false,Email:false});
  const [open, setOpen] = useState(false);
  const [warnnig,setWaring] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({...Errors,[name]:false})
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleError = (e)=>{
    const {name,value} = e.target
    if(!value){
      setErrors({...Errors,[name]:true})
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setOpen(true)
      const  userInfo = await prefernce(data).unwrap()
      const updateUserInfo = {accsess_token:token,get_user:userInfo}
      dispatch(setCredentials(updateUserInfo))
      setTimeout(()=>{setOpen(false)},500)
    } catch (error) {
      setOpen(false)
      setWaring(true)
     
    }
  }
  
  const isDisabled = Errors.FirstName || Errors.LastName || Errors.MiddleName || Errors.FatherOfRepetance || Errors.ChristianName || Errors.Email
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{display:'flex',flexDirection:'column',gap:'1.5rem'}}mt={2}ml={2}mr={2}>
    <Grid spacing={2} container >
     <Grid item sm={4} xs={12}>
      <TextField  onChange={handleChange} onBlur={handleError} name='FirstName' label='ስም'  defaultValue={user.FirstName} fullWidth />
       <FormHelperText sx={{color:'red'}}>{Errors.FirstName?"ስም ያስፈልጋል":""}</FormHelperText>
     </Grid>
     <Grid item sm={4} xs={12}>
      <TextField  onChange={handleChange} onBlur={handleError} name='MiddleName' label='የአባት ስም'  defaultValue={user.MiddleName} fullWidth />
      <FormHelperText sx={{color:'red'}}>{Errors.MiddleName?"የአባት ስም ያስፈልጋል":""}</FormHelperText>
     </Grid>
     <Grid item sm={4} xs={12}>
      <TextField  onChange={handleChange} onBlur={handleError} name='LastName' label='የአያት ስም' defaultValue={user.LastName} fullWidth />
      <FormHelperText sx={{color:'red'}}>{Errors.LastName?"የአያት ስም ያስፈልጋል":""}</FormHelperText>
     </Grid>
    </Grid>
    
    <Grid spacing={1} container>
      <Grid sm={6} xs={12} item>
      <TextField  onChange={handleChange} onBlur={handleError} name='ChristianName' label='ክርስትና ስም' defaultValue={user.ChristianName}   fullWidth />
      <FormHelperText sx={{color:'red'}}>{Errors.ChristianName?"ክርስትና ስም ያስፈልጋል":""}</FormHelperText>
      </Grid>
      <Grid sm={6} xs={12} item>
      <TextField  onChange={handleChange} onBlur={handleError} name='FatherOfRepetance' label='የንስሃ አባት' defaultValue={user.FatherOfRepetance}   fullWidth />
      <FormHelperText sx={{color:'red'}}>{Errors.FatherOfRepetance?"የንስሃ አባት":""}</FormHelperText>
      </Grid>
    </Grid>
   <Divider textAlign="left"></Divider>
    <Grid container>
      <Grid sm={12} xs={12} item>
      <TextField   onChange={handleChange} onBlur={handleError} name='Email'  label='የይለፍ ቃል' defaultValue={user.Email} fullWidth />
      <FormHelperText sx={{color:'red'}}>{Errors.Email?"የይለፍ ቃል ያስፈልጋል":""}</FormHelperText>
      </Grid>
    </Grid>
   <Box sx={{display:'flex',justifyContent:{sm:'flex-end',xs:'center'}}}>
   <Button type="submit" disabled={isDisabled}  variant="contained" size='large'
    sx={{ mt: 2, mb: 2,width:{xs:'100%',sm:'25%'} }}>ቀይር</Button>
  </Box>
  <Backdrop
         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open={open}
         onClick={handleClose}
       >
         <CircularProgress color="inherit" />
     </Backdrop>
     <Snackbar open={warnnig} anchorOrigin={{ vertical:'top', horizontal:'center'}} autoHideDuration={3000} onClose={()=>setWaring(false)}>
           <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
             መዝገቡን መቀየር አልተሳካም
           </Alert>
     </Snackbar>
 </Box>
  )
}

export default UpdateUserInfo