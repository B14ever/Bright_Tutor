import {useState} from 'react'
import {Backdrop,CircularProgress,IconButton} from '@mui/material'
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../../Features/Shared/Auth/authSlice"
import {useChangePasswordMutation} from '../../Features/Shared/Auth/authApiSlice'
import { useLanguage } from '../../Features/Shared/Language/LanguageContext'
import {useNavigate,useLocation} from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const RecoverPassword = () => {

  const [data,setData] = useState({Password:'',confirmPassword: ''})
  const [Errors, setErrors] = useState({Password:'', confirmPassword:''});
  const [errorMsg,setErrorMsg] = useState('')
  const [open, setOpen] = useState(false)
  const [showPassword,setShowPassword] = useState(false)
  //
  const [changePassword] = useChangePasswordMutation()
  //
  const token = useSelector(selectCurrentToken)
  const {t} = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    setErrors({ ...Errors, [name]: '' })
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('')
    setErrorMsg('')
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
             setOpen(true)
             await changePassword(data,token)
             setTimeout(()=>{setOpen(false),500})
             navigate('/login',{ state: { from: location } }) 
    } catch(err){
        setTimeout(()=>{setOpen(false),200})
        if (!err) {
          setErrorMsg('NoServerResponse');  
        } else if (err) {
          setErrorMsg(err.data.err)
        } else {
          setErrorMsg('Failed');
        }
      }
    } else {
      setErrors(errors);
    }
  }
  const validateForm = () => {
    const formErrors = {};
    if (!data.Password) {
      formErrors.Password = 'NoNewPassword';
    }

    if(!data.confirmPassword){
      formErrors.confirmPassword = 'NoConfirmPassword'
    }
    if( data.confirmPassword !== data.Password){
      formErrors.confirmPassword = 'ConfrimNotMatch'
    }

    return formErrors;
  };
  return (
    <div className="w-full mt-14 min-h-full px-6 py-12 lg:px-8">
    <div className="w-full flex flex-1 flex-col items-center ">
      <h1 className="text-xl text-center font-semibold">{t('ResetPassword')}</h1>
      
      <form onSubmit={handleSubmit} className="p-5 mt-4 rounded-lg w-full lg:w-1/2 space-y-6 shadow-md">
        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            {t("NewPassword")}
          </label>
          <div className='relative'>
          <input
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            id="password"
            name="Password"
          />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          sx={{ outline: 'none' }}
        >
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </div>
          </div>
         { Errors.Password && <p className="text-red-500 text-xs mt-1">{t(`${Errors.Password}`)}</p>}
        </div>
        <div>
  <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
    {t('ConfirmPassword')}
  </label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      onChange={handleChange}
      className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
      id="confirmPassword"
      name="confirmPassword"
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
    <IconButton
      onClick={() => setShowPassword(!showPassword)}
      sx={{ outline: 'none' }}
    >
      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </IconButton>
  </div>
  </div>
  { Errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{t(`${Errors.confirmPassword}`)}</p>}
</div>

        {errorMsg && <p className="text-red-500 text-sm">{t(`${errorMsg}`)}</p>}
        <button
          type="submit"
          className="mt-4 w-full sm:w-1/2 bg-indigo-600 hover:bg-indigo-500 text-white font-light py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          {t('Submit')}
        </button>
      </form>
    </div>
    <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
    </Backdrop>
  </div>
  
  )
}

export default RecoverPassword
