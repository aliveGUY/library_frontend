import { useEffect, useRef, useState } from "react"
import { useRegisterNewUserMutation } from "../app/api/usersSlice"
import LoadingSpinner from "../components/LoadingSpinner"
import Error from "../components/Error"
import { useNavigate } from "react-router-dom"

const Registration = () => {
  const navigate = useNavigate()
  const userRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [registerNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRegisterNewUserMutation()
  const canSave = [username, password].every(Boolean) && !isLoading

  useEffect(() => {
    userRef.current.focus()
  },[])

  useEffect(() => {
    if (isSuccess) {
      setUsername('')
      setPassword('')
      navigate('/login')
    }
  }, [isSuccess, navigate])


  const handleSubmit = async e => {
    e.preventDefault()
    if (canSave) {
      await registerNewUser({ username, password })
    }
  }

  const handleUserInput = e => setUsername(e.target.value)
  const handlePwdInput = e => setPassword(e.target.value)

  if (isLoading) return <LoadingSpinner />
  if (isError) return <Error error={error} />

  return (
    <section>
      <h2>Registration</h2>
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

        <button disabled={!canSave} className="button">Sign Up</button>
      </form>
    </section>
  )

}

export default Registration