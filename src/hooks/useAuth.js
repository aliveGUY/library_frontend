import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { selectCurrentToken } from '../app/api/authSlice'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isCustomer = false
  let isAdmin = false
  let status = "Employee"

  if (token) {
    const decoded = jwtDecode(token)
    const { username, roles } = decoded.UserInfo

    isCustomer = roles.includes('Customer')
    isAdmin = roles.includes('Admin')

    if (isCustomer) status = "Customer"
    if (isAdmin) status = "Admin"

    return { username, roles, status, isCustomer, isAdmin }
  }

  return { username: '', roles: [], isCustomer, isAdmin, status }
}
export default useAuth