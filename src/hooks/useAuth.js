import { selectCurrentUser } from '../app/api/authSlice'
import { useSelector } from 'react-redux'

const useAuth = () => {
  let isCustomer = true
  let isAdmin = false
  let status = "Guest"

  const user = useSelector(selectCurrentUser)

  if (user) {
    const { username, roles, id, avatar } = user

    isCustomer = roles.includes('Customer')
    isAdmin = roles.includes('Admin')

    if (isCustomer) status = "Customer"
    if (isAdmin) status = "Admin"

    return { username, roles, id, avatar, status, isCustomer, isAdmin }
  }

  return { username: '', roles: [], id: '', avatar: '', status, isCustomer, isAdmin }
}

export default useAuth
