import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Users from "./pages/Users"
import Login from "./pages/Login"
import InfoBook from "./pages/InfoBook"
import Account from "./pages/Account"
import AddNewBook from "./pages/AddNewBook"
import PersistLogin from "./middleware/PersistLogin"
import Registration from "./pages/Registration"
import RolesControll from "./middleware/RolesControll"

import { Suspense } from "react"
import LoadingSpinner from "./components/LoadingSpinner"

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/book/:id" element={<InfoBook />} />

        {/* Protected Routes */}
        <Route element={<RolesControll allowedRole="Customer" />}>
          <Route path="/account" element={<Account />} />
          <Route path="/book/new" element={<AddNewBook />} />

          <Route element={<RolesControll allowedRole="Admin" />}>
            <Route path="/users" element={<Users />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default function WrappedApp() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <App />
    </Suspense>
  )
}
