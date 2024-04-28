import React,{useEffect, useState} from 'react'
import {Backdrop,CircularProgress} from '@mui/material'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../Features/Shared/Auth/authSlice'
import { useLanguage } from '../../Features/Shared/Language/LanguageContext'
import { useEmailVerificationMutation,useResendCodeMutation} from '../../Features/Shared/Auth/authApiSlice'
import { useNavigate,useLocation } from 'react-router-dom'
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../../Features/Shared/Auth/authSlice"
const EmailVerification = () => {
  const [Code,setCode] = useState()
  const [error,setError] = useState('')
  const [open, setOpen] = useState(false)
  //
  const dispatch = useDispatch() 
  const [emailVerification] = useEmailVerificationMutation()
  const [resendCode] = useResendCodeMutation()

  //
  const token = useSelector(selectCurrentToken)
  const {t} = useLanguage()
  const navigate = useNavigate()
  const location = useLocation();
  const prevLocation = location.state && location.state.from

  const handleClose = () => {
    setOpen(false);
  };
  const HandleSubmit = async (e)=>{
    e.preventDefault()
    setError('')
     if(Code){
      try{
        setOpen(true)
        const userData = await emailVerification({Code,Path:prevLocation.pathname}).unwrap()
        dispatch(setCredentials({ ...userData}))
        setTimeout(()=>{setOpen(false),100})
      if(prevLocation.pathname === '/signup'){
            navigate('/profile')
      }
      if(prevLocation.pathname === '/forgetPassword'){ 
         navigate("/recoverPassword")  
      }
      }catch(err){
        setTimeout(()=>{setOpen(false),200})
        if (!err) {
          setError('NoServerResponse');  
        } else if (err) {
          setError(err.data.err)
        } else {
          setError('Failed');
        }
      }
  }
  else{
      setError('InvalidCode')
   }
 }
const ResendCode = async () =>{
     try{
      setError('')
      setCode('')
      setOpen(true)
      const userData = await resendCode(token).unwrap()
      dispatch(setCredentials({ ...userData}))
     }catch(err){
      if (!err) {
        setError('ServerError');
      } 
     }finally
     {
      setTimeout(()=>{setOpen(false),200})
     }
}
  return (
    <div className="w-full mt-14 min-h-full px-6 py-12 lg:px-8">
    <div className="w-full flex  flex-1 flex-col items-center ">
      <h1 className="text-xl text-center font-semibold">{t('VerifyEmail')}</h1>
      
      <form onSubmit={HandleSubmit} className="p-5 mt-4 rounded-lg w-full lg:w-1/2 space-y-6 shadow-md">
        <div>
          <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">
            {t('EnterVerificationcode')}
          </label>
          <input
            type="text"
            onChange={(e) => setCode(e.target.value)}
            value={Code}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            id="code"
            name="code"
          />
          {error && <p className="text-red-500 text-xs mt-1">{t(`${error}`)}</p>}
        </div>
        <button
          type="submit"
          className="mt-4 w-full sm:w-1/2 bg-indigo-600 hover:bg-indigo-500 text-white font-light py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"        >
          {t('Verify')}
        </button>
      </form>
      <div className="flex justify-center mt-4">
        <p className="text-sm">
          {t('Nocode')}  <button className="text-indigo-600" onClick={ResendCode}>{t('ResendCode')}</button>
        </p>
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
  
)
}

export default EmailVerification