import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../Features/Shared/Auth/authSlice'
import { useLoginMutation } from '../../Features/Shared/Auth/authApiSlice'
import { jwtDecode } from "jwt-decode"
import {useLanguage} from '../../Features/Shared/Language/LanguageContext'

const LoginForm = () => {
  const [data,setData] = useState({Email:'',Password:''})
  const [Errors,setErrors] = useState({Email:'',Password:''})
  const [errorMsg,setErrorMsg] = useState('')
  const {t} = useLanguage()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({...Errors,[name]:''})
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('')
    setErrorMsg('')
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const userData = await login({...data}).unwrap()
        dispatch(setCredentials({ ...userData}))
        const decodedToken = jwtDecode(userData.accsess_token);
        if(decodedToken.role === 'Admin')
        {
          navigate('/admin')
        }
        if(decodedToken.role === 'Tutors')
        {
          navigate('/tutors')
        }
        if(decodedToken.role === 'Customer')
        {
          
          navigate('/customers')
        }
    } catch (err) {
      if (!err) {
        
        setErrorMsg('NoServerResponse');  
    } else if (err.status === 401) {
        setErrorMsg(err.data);
    } else {
        setErrorMsg('LoginFailed');
    }
    }
    } else {
      setErrors(errors);
    }
  };
const validateForm = () => {
    const formErrors = {};
    if (!data.Email) {
        formErrors.Email = 'EmailRequired';
      } else if (!/^\S+@\S+\.\S+$/.test(data.Email)) {
        formErrors.Email = 'EmailRequired';
      }
      if (!data.Password) {
        formErrors.Password = 'PasswordRequired';
      }   
    return formErrors;
}
  
  return (
    <div className="mt-14 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {t("LoginText")}
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6"action="#!"  onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Email" className="block text-sm font-medium leading-6 text-gray-900">
            {t('Email')}
          </label>
          <div className="mt-2">
            <input
              onChange={handleChange}
              id="Email"
              name="Email"
              type="Email"
             
              className="block w-full w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <p className="text-red-500 text-xs mt-1">{Errors.Email?t(`${Errors.Email}`):''}</p>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="Password" className="block text-sm font-medium leading-6 text-gray-900">
              {t("Password")}
            </label>
            <div className="text-sm">
              <a href="#" onClick={()=>navigate('/forgetPassword')} className="font-semibold text-indigo-600 hover:text-indigo-500">
                {t('ForgotPassword')}
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              onChange={handleChange}
              id="Password"
              name="Password"
              type="Password"
             
              className="block w-full w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            <p className="text-red-500 text-xs mt-1">{Errors.Password?t(`${Errors.Password}`):''}</p>
          </div>
          
        </div>
          <p className="text-red-500 text-xs mt-1">{errorMsg?t(`${errorMsg}`):''}</p>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
           {t("SignIn")}
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        {t('Notmember')}{' '}
        <a  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
         {t('JoinUs')}
        </a>
      </p>
    </div>
  </div>
  
  );
}
export default LoginForm