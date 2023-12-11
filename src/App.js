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
import EditBook from "pages/EditBook"
import Cart from "pages/Cart"
import { Suspense } from "react"
import LoadingSpinner from "./components/LoadingSpinner"
import EditAccount from "pages/EditAccount"

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/book/:id" element={<InfoBook />} />
        <Route path="/account/:id" element={<Account />} />
        <Route path="/cart" element={<Cart />} />

        {/* Protected Routes */}
        <Route element={<RolesControll allowedRole="Customer" />}>
          <Route path="/book/new" element={<AddNewBook />} />
          <Route path="/book/edit/:id" element={<EditBook />} />
          <Route path="/account/edit/:id" element={<EditAccount />} />

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
