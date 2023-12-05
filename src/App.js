import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Users from "./pages/Users"
import Login from "./pages/Login"
import InfoBook from "./pages/InfoBook"
import PersistLogin from "./components/PersistLogin"
import Layout from "./components/Layout"
import Account from "./pages/Account"
import AddNewBook from "./pages/AddNewBook"
import Registration from "./pages/Registration"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/book/:id" element={<InfoBook />} />

          {/* Should Be Protected */}
          <Route path="/users" element={<Users />} />
          <Route path="/account" element={<Account />} />
          <Route path="/book/new" element={<AddNewBook />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
