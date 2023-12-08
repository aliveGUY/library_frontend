import { Outlet } from "react-router-dom"
import useAuth from "hooks/useAuth"
import Error from "components/Error"

const rolesHeights = {
  "Customer": 1000,
  "Admin": 5000
}

const RolesControll = ({ allowedRole }) => {
  const { status } = useAuth()

  if (rolesHeights[allowedRole] <= rolesHeights[status]) return <Outlet />

  return (
    <Error
      error="Access Denied"
      redirects={["Home", "Login"]}
    />
  )

}

export default RolesControll