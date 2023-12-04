import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner"
import { useSendLogoutMutation } from "../app/api/authApiSlice"
import Error from "./Error"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../app/api/authSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const Navbar = () => {
  const user = useSelector(selectCurrentUser)
  const loggedIn = Boolean(user?.username)
  const navigate = useNavigate()
  const [dropDown, setDropDown] = useState(false)

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  if (isLoading) return <LoadingSpinner />

  if (isError) return <Error error={error} />

  const loginButton = (
    <div className="login" onClick={() => navigate('/login')}>
      login
    </div>
  )

  const logoutButton = (
    <li onClick={sendLogout}>
      Logout
    </li>
  )

  const userLink = (
    <li onClick={() => navigate('/account')}>
      Account Info
    </li>
  )

  const AddNewBook = (
    <li onClick={() => navigate('/book/new')}>
      Add New Book
    </li>
  )

  const profileDrowDown = (
    <button className={`accountDropDown ${dropDown}`} onClick={() => setDropDown(prev => !prev)}>
      <span className="userIcon"><FontAwesomeIcon icon={faUser} /></span>
      <span className="userName">{user?.username}</span>
      <ul className="dropDown">
        {userLink}
        {AddNewBook}
        {logoutButton}
      </ul>
    </button>
  )

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1 className="logo">Бібліотека</h1>
        </Link>
        <nav>
          {loggedIn
            ? profileDrowDown
            : loginButton}
        </nav>
      </div>
    </header>
  )
}

export default Navbar