import { useEffect, useRef, useState } from "react"
import { useRegisterNewUserMutation } from "app/api/usersApiSlice"
import LoadingSpinner from "components/LoadingSpinner"
import { useNavigate } from "react-router-dom"
import { Trans, useTranslation } from "react-i18next"
import Layout from "components/Layout"
import Section from "components/Section"
import image from 'images/sections/registration-image.png'
import Button from "components/Button"
import defaultAvatar from 'images/components/default-profile.jpg'
import convertToBase64 from "helpers/conertToBase64"


const Registration = () => {
  const { t } = useTranslation()
  const title = t("IMBook — Registration")
  const description = t("IMBook gives writers the opportunity to monetize their stories, find a publisher, and more. Join our community to realize all your ideas.")
  const navigate = useNavigate()
  const userRef = useRef()
  const [errMsg, setErrMsg] = useState('')
  const [username, setUsername] = useState('')
  const [about, setAbout] = useState('')
  const [avatar, setAvatar] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [registerNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRegisterNewUserMutation()
  const canSave = [username, password, confirmPassword].every(Boolean) && !isLoading

  useEffect(() => {
    userRef.current.focus()
    setAvatar(convertToBase64(defaultAvatar, base64 => setAvatar(base64)))
  }, [])

  useEffect(() => {
    if (isSuccess) {
      setUsername('')
      setPassword('')
      navigate('/login')
    }
  }, [isSuccess, navigate])

  useEffect(() => {
    if (isError) {

    }
  }, [isError])


  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (username.length === 0) {
        throw new Error(t("Username is missing!"))
      }

      if (password !== confirmPassword) {
        throw new Error(t("Password doesn't match!"))
      }
      if (canSave) {
        await registerNewUser({ username, password, avatar, about })
      }
    } catch (err) {
      console.log(err.message)
      setErrMsg(err.message)
    }
  }

  const handleUserInput = e => setUsername(e.target.value)
  const handleAboutInput = e => setAbout(e.target.value)
  const handlePwdInput = e => setPassword(e.target.value)
  const handleConfirmPwdInput = e => setConfirmPassword(e.target.value)
  const handleImgInput = async e => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file)
      convertToBase64(url, base64 => {
        setAvatar(base64);
      })
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <Layout className="register-page" title={title} description={description}>
      <Section className="register-section">
        <div className="register-image-wrapper">
          <div className="register-image">
            <img src={image} alt="register image" />
          </div>
        </div>
        <div className="form-wrapper">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>
              <Trans>Create a new account</Trans>
            </h2>
            <label htmlFor="avatar" className="avatar" data-icon="&#x270E;">
              <img src={avatar} width="200" />
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleImgInput}
              accept="image/*"
            />

            <label htmlFor="username">
              <Trans>Username</Trans>
            </label>
            <input
              required
              type="text"
              data-testid="username"
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
            />

            <label htmlFor="about">
              <Trans>About</Trans>
            </label>
            <textarea
              type="text"
              id="about"
              value={about}
              maxLength="100"
              onChange={handleAboutInput}
            />

            <label htmlFor="password">
              <Trans>Password</Trans>
            </label>
            <input
              type="password"
              data-testid="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
            />

            <label htmlFor="password">
              <Trans>Confirm Password</Trans>
            </label>
            <input
              type="password"
              data-testid="confirm-password"
              id="password"
              onChange={handleConfirmPwdInput}
              value={confirmPassword}
              required
            />

            <div className="error" >{errMsg}</div>
            <Button theme="marengo" disabled={!canSave}>
              <Trans>Sign Up</Trans>
            </Button>
          </form>
        </div>
      </Section>
    </Layout>
  )

}

export default Registration