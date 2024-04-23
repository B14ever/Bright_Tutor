import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"
import { jwtDecode } from "jwt-decode"
const RequireAuth = ({Autherazetion}) => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
   
    if(token){
        const decodedToken = jwtDecode(token)
       return  Autherazetion.includes(decodedToken.role)?
       <Outlet/>:<Navigate to="/pageNotFound"/>
         }
      else{
      return <Navigate to="/" state={{ from: location }} replace />
      }
}
export default RequireAuth