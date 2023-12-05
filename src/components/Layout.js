import { Outlet } from 'react-router-dom'
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = () => {
  return (
    <main className="App">
      <Navbar />
      <div className="pages-wrapper">
        <div className="pages">
          <Outlet />
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default Layout
