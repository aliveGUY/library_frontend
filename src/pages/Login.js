import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from '../app/api/authApiSlice'
import { setCredentials } from "../app/api/authSlice"
import LoadingSpinner from "../components/LoadingSpinner"
import Error from '../components/Error'
import usePersist from "../hooks/usePersist"

const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [username, setUser] = useState('')
  const [password, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { user } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ user }))
      setUser('')
      setPwd('')
      navigate('/')
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg('No Server Response');
      } else if (err.originalStatus === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.originalStatus === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  }

  const handleUserInput = (e) => setUser(e.target.value)
  const handleToggle = () => setPersist(prev => !prev)
  const handlePwdInput = (e) => setPwd(e.target.value)

  const content = isLoading ? <LoadingSpinner /> : (
    <section >
      <h2>Login</h2>
      <Error error={errMsg} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          value={username}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={password}
          required
        />

        <label htmlFor="persist">
          <input
            type="checkbox"
            id="persist"
            onChange={handleToggle}
            checked={persist}
          />
          Trust This Device
        </label>

        <button className="button">Sign In</button>
      </form>
      <div className="signupLink">
        Need an account?&nbsp;
        <b>
          <a href="/registration">Registration</a>
        </b>
      </div>
    </section>
  )

  return content
}

export default Login