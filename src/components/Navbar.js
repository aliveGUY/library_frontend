import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner"
import { useSendLogoutMutation } from "../app/api/authApiSlice"
import Error from "./Error"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../app/api/authSlice"

const Navbar = () => {
	const user = useSelector(selectCurrentUser)
	const loggedIn = Boolean(user?.username)
	const navigate = useNavigate()

	const [sendLogout, {
		isLoading,
		isSuccess,
		isError,
		error
	}] = useSendLogoutMutation()

	useEffect(() => {
		if (isSuccess) navigate('/')
	}, [isSuccess, navigate])

	const onLogoutClicked = () => sendLogout()

	if (isLoading) return <LoadingSpinner />

	if (isError) return <Error error={error} />


	const logoutButton = (
		<button title="logout" onClick={onLogoutClicked}>
			Logout
		</button>
	)

	const loginButton = (
		<button onClick={() => navigate('/login')}>
			login
		</button>
	)

	const userLink = (
		<button onClick={() => navigate('/account')}>
			User: {user?.username}
		</button>
	)

	return (
		<header>
			<div className="container">
				<Link to="/">
					<h1 className="logo">Бібліотека</h1>
				</Link>
				<nav>
					{loggedIn && userLink}
					{loggedIn && logoutButton}
					{!loggedIn && loginButton}
				</nav>
			</div>
		</header>
	)
}

export default Navbar