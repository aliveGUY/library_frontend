import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from 'app/api/authApiSlice'
import { setCredentials } from "app/api/authSlice"
import usePersist from "hooks/usePersist"
import LoadingSpinner from "components/LoadingSpinner"
import Error from 'components/Error'
import { useTranslation, Trans } from "react-i18next"
import Layout from 'components/Layout'
import Section from "components/Section"
import Button from "components/Button"
import image from 'images/sections/login-image.png'
import { useGetCartMutation } from "app/api/cartApiSlice"
import { setCart } from "app/api/cartSlice"
import { signal } from "@preact/signals-react"

const username = signal('')
const handleUserInput = (e) => username.value = e.target.value

const password = signal('')
const handlePwdInput = (e) => password.value = e.target.value


const Login = () => {
  const { t } = useTranslation()
  const title = t("IMBook — Login")
  const description = t("IMBook gives writers the opportunity to monetize their stories, find a publisher, and more. Join our community to realize all your ideas.")
  const userRef = useRef()
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()
  const navigate = useNavigate()


  const [login, { isLoading }] = useLoginMutation()
  const [getCart] = useGetCartMutation()
  const dispatch = useDispatch()
  const handleToggle = () => setPersist(prev => !prev)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { user } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ user }))
      const { cart } = await getCart({ user: user.id }).unwrap()
      console.log(cart)
      dispatch(setCart({ cart }))
      navigate('/')
    } catch (err) {
      console.log(err)
      if (!err?.status) {
        // isLoading: true until timeout occurs
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
  }


  const content = isLoading ? <LoadingSpinner /> : (
    <Layout className="login-page" title={title} description={description}>
      <Section className="login-section">
        <div className="login-image-wrapper">
          <div className="login-image">
            <img src={image} alt="login" width="100%" height="auto" title="login" loading="lazy" />
          </div>
        </div>
        <div className="form-wrapper">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h1>
              <Trans>Sign in to your account</Trans>
            </h1>
            <Error error={errMsg} />
            <label htmlFor="username">
              <Trans>Username</Trans>
            </label>
            <input
              type="text"
              data-testid="username"
              id="username"
              ref={userRef}
              value={username.value}
              onChange={handleUserInput}
              autoComplete="off"
              required
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

            <label htmlFor="persist">
              <input
                type="checkbox"
                id="persist"
                data-testid="persist"
                onChange={handleToggle}
                checked={persist}
              />
              &nbsp;
              <Trans>Trust This Device</Trans>
            </label>

            <Button theme="marengo">
              <Trans>Sign In</Trans>
            </Button>
            <div className="signupLink">
              <b>
                <Trans>Need an account? <a href="/registration">Registration</a></Trans>
              </b>
            </div>
          </form>
        </div>
      </Section>
    </Layout>
  )

  return content
}

export default Login