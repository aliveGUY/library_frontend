import { Outlet } from "react-router-dom"
import DashHeager from "./DashHeager"
import DashFooter from "./DashFooter"

const DashLayout = () => {
  return (
    <>
    <DashHeager />
    <div className="dash-container">
      <Outlet />
    </div>
    <DashFooter />
    </>
  )
}

export default DashLayout
