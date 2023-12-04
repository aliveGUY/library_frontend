import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../app/api/authSlice'
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isCustomer = false
  let isAdmin = false
  let status = "Employee"

  if (token) {
    const decoded = jwtDecode(token)
    const { username, roles, id } = decoded.UserInfo

    isCustomer = roles.includes('Customer')
    isAdmin = roles.includes('Admin')

    if (isCustomer) status = "Customer"
    if (isAdmin) status = "Admin"

    return { username, roles, id, status, isCustomer, isAdmin }
  }

  return { username: '', roles: [], id: '', isCustomer, isAdmin, status }
}
export default useAuth