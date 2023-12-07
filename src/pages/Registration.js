import { useEffect, useRef, useState } from "react"
import { useRegisterNewUserMutation } from "app/api/usersSlice"
import LoadingSpinner from "components/LoadingSpinner"
import Error from "components/Error"
import { useNavigate } from "react-router-dom"
import { Trans, useTranslation } from "react-i18next"
import Layout from "components/Layout"
import Section from "components/Section"
import image from 'images/sections/hero-image.png'
import Button from "components/Button"

const Registration = () => {
  const { t } = useTranslation()
  const title = t("IMBook — Registration")
  const description = t("IMBook gives writers the opportunity to monetize their stories, find a publisher, and more. Join our community to realize all your ideas.")
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
  }, [])

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
    <Layout className="register-page" title={title} description={description}>
      <Section  className="register-section">
      <div className="register-image">
          <img src={image} />
        </div>
        <div className="form-wrapper">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>
              <Trans>Create a new account</Trans>
            </h2>
            <label htmlFor="username">
              <Trans>Username</Trans>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />

            <label htmlFor="password">
              <Trans>Password</Trans>
            </label>
            <input
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
            />

            <Button  theme="marengo" disabled={!canSave}>
              <Trans>Sign Up</Trans>
            </Button>
          </form>
        </div>
      </Section>
    </Layout>
  )

}

export default Registration