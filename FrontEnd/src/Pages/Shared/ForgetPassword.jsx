import {useState}from 'react'
import { Backdrop,CircularProgress} from '@mui/material'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../Features/Shared/Auth/authSlice'
import { useForgotPasswordMutation } from '../../Features/Shared/Auth/authApiSlice'
import {useNavigate,useLocation} from 'react-router-dom'
import { useLanguage } from '../../Features/Shared/Language/LanguageContext'
const FORGET_PASSWORD_URL = '/Login/forgotenPassword'
const ForgetPassword = () => {
  const [Email,setEmail] = useState('')
  const [Errors,setError] = useState('')
  const [open, setOpen] = useState(false)
  //
  const dispatch = useDispatch() 
  const [forgotPassword, {isLoading}] = useForgotPasswordMutation()
  //
  const {t} = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
         setOpen(true)
         const userData = await forgotPassword(Email).unwrap()
         dispatch(setCredentials({ ...userData}))
         setTimeout(()=>{setOpen(false),100})
         navigate("/emailverification",{ state: { from: location } })
    } catch (err) {
      setTimeout(()=>{setOpen(false),200})
      if (!err) {
        setError('NoServerResponse');  
      } else if (err.status === 409) {
        setError(err.data.error)
      } else {
        setError('Failed');
      }
    }
    } else {
      setError(errors);
    }
  };
  const validateForm = () => {
    let formErrors = '';
    if (!Email) {
         formErrors = 'EmailRequired';
      } else if (!/^\S+@\S+\.\S+$/.test(Email)) {
        formErrors = 'InvalidEmail';
      } 
    return formErrors;
}
  return (
  <div className="w-full mt-14 min-h-full px-6 py-12 lg:px-8">
  <div className="w-full flex  flex-1 flex-col items-center ">
    <h1 className="text-xl text-center font-semibold">{t('ResetPassword')}</h1>
    
    <form  onSubmit={handleSubmit} className="p-5 mt-4 rounded-lg w-full lg:w-1/2 space-y-6 shadow-md">
      <div>
        <label htmlFor="Email" className="block text-sm font-medium leading-6 text-gray-900">
              {t('Email')}
        </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          id="Email"
          name="Email"
        />
        {Errors && <p className="text-red-500 text-xs mt-1">{t(`${Errors}`)}</p>}
      </div>
      <button
        type="submit"
        className="mt-4 w-full sm:w-1/2  bg-indigo-600 hover:bg-indigo-500 text-white font-light py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
      >
        {t('ForgetPasswordButton')}
      </button>
    </form>
    <div className="flex justify-center mt-4">
    </div>
  </div>
  <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
    </Backdrop>
</div>

)}

export default ForgetPassword
