import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner"
import { useSendLogoutMutation } from "app/api/authApiSlice"
import Error from "./Error"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import useAuth from "hooks/useAuth"
import { useTranslation, Trans } from "react-i18next"
import logo from '../images/logos/imbook-512x512.png'
import Button from "./Button"
import Section from './Section'

const locales = {
  ua: '🇺🇦 Ua',
  en: '🇬🇧 En',
}

const onLangSwitch = e => {
  if (e.target.children[0]?.classList.value.includes("options")) {
    e.target.children[0].classList.toggle("show")
  } else if (e.target.parentElement.parentElement.classList.contains("show")) {
    e.target.parentElement.parentElement.classList.toggle("show")
  }
}

const Navbar = () => {
  const { i18n } = useTranslation()
  const user = useAuth()
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

  const LangSwitcher = (
    <div className="lang-switcher" onClick={onLangSwitch}>
      {locales[i18n.resolvedLanguage]}
      <ul className="options">
        {Object.keys(locales).map(locale => (
          <li key={locale} className={`selected-${i18n.resolvedLanguage === locale}`}>
            <button onClick={() => i18n.changeLanguage(locale)}>
              {locales[locale]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )

  const cartButton = (
    <Button theme="grullo">
      <Trans>Cart</Trans>
    </Button>
  )

  const loginButton = (
    <Button theme="grullo" onClick={() => navigate('/login')}>
      <Trans>Login</Trans>
    </Button>
  )

  const logoutButton = (
    <Button theme="grullo" onClick={sendLogout}>
      <Trans>Logout</Trans>
    </Button>
  )

  const accountButton = (
    <Button theme="grullo" onClick={() => navigate('/account')}>
      <Trans>Account Info</Trans>
    </Button>
  )

  const AddNewBook = (
    <Button theme="grullo" onClick={() => navigate('/book/new')}>
      <Trans>Add New Book</Trans>
    </Button>
  )

  const ManageUsers = (
    <Button theme="grullo" onClick={() => navigate('/users')}>
      <Trans>Manage All Users</Trans>
    </Button>
  )

  const sessionButtons = [
    accountButton,
    AddNewBook,
    user.isAdmin && ManageUsers,
    logoutButton,
  ]

  const accountDropdown = (
    <div className={`account-dropdown account-active-${dropDown}`} onClick={() => setDropDown(prev => !prev)}>
      <FontAwesomeIcon icon={faUser} className="icon"/>
      {user.username}
      <div className={`options dropdown-${dropDown}`}>
        {sessionButtons}
      </div>
    </div>
  )

  return (
    <Section className="navbar">
      <Link to="/" className="navbar-logo" >
        <img src={logo} />
      </Link>
      <nav className="navbar-burger" onClick={() => setDropDown(prev => !prev)}>
        <div className={`burger-${dropDown}`} />
      </nav>
      <div className={`burger-options-${dropDown}`}>
        {cartButton}
        {loggedIn
          ? sessionButtons
          : loginButton}
        {LangSwitcher}
      </div>
      <nav className="navbar-navigation">
        {cartButton}
        {loggedIn
          ? accountDropdown
          : loginButton}
        {LangSwitcher}
      </nav>
    </Section>
  )
}

export default Navbar