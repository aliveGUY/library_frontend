import Layout from "components/Layout"
import Section from "components/Section"
import useAuth from "hooks/useAuth"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import convertToBase64 from "helpers/conertToBase64"
import Button from "components/Button"
import { useDeleteUserMutation, useGetUserByIdQuery } from "app/api/usersApiSlice"
import { useUpdateUserMutation } from "app/api/usersApiSlice"
import LoadingSpinner from "components/LoadingSpinner"
import { useTranslation, Trans } from "react-i18next"
import { useSendLogoutMutation } from "app/api/authApiSlice"

const EditAccount = () => {
  const { t } = useTranslation()
  const title = t("Edit Account - IMBook")
  const { pathname } = useLocation()
  const regex = /\/account\/edit\/([a-fA-F0-9]+)/
  const id = pathname.match(regex)[1]
  const navigate = useNavigate()
  const user = useAuth()
  const loggedIn = Boolean(user?.username)
  const isAdmin = Boolean(user?.roles.includes('Admin'))

  if (!loggedIn && (id !== user.id || !isAdmin)) {
    navigate('/')
  }


  const [errMsg, setErrMsg] = useState('')
  const [curAvatar, setAvatar] = useState('')
  const [usrName, setUsrName] = useState('')
  const [curAbout, setCurAbout] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [changePwd, setChangePWD] = useState(false)
  const [curRoles, setCurRoles] = useState([])

  const rolesRef = useRef()

  const {
    data,
    isSuccess,
    isLoading,
  } = useGetUserByIdQuery({ id })

  const [updateUser, {
    isLoading: isUserUpdateLoading,
    isSuccess: isUserUpdateSuccess,
    isError: isUserUpdateError,
    error: userUpdateError
  }] = useUpdateUserMutation()

  const [sendLogout, {
    isLoading: isLogoutLoading,
    isSuccess: isLogoutSuccess,
  }] = useSendLogoutMutation()

  const [deleteUser, {
    isLoading: isDeletionLoading
  }] = useDeleteUserMutation()




  useEffect(() => {
    if (isSuccess) {
      const { username, roles, about, avatar } = data
      setUsrName(username)
      setCurAbout(about)
      setCurRoles(roles)
      setAvatar(avatar)

      if (isAdmin) {
        rolesRef.current.children[0].checked = roles.includes('Customer')
        rolesRef.current.children[2].checked = roles.includes('Admin')
      }
    }
  }, [isSuccess])

  useEffect(() => {
    if (isUserUpdateSuccess) {
      navigate(-1)
    }
  }, [isUserUpdateSuccess])
  
  useEffect(() => {
    if (isLogoutSuccess) navigate('/')
  }, [isLogoutSuccess, navigate])

useEffect(() => {
  if (isUserUpdateError) {
    if (userUpdateError.status === 409) {
      setErrMsg(t("Username is already taken!"));
    }
  }
}, [isUserUpdateError]);


  const onUserDelete = async e => {
    const userConfirmation = window.confirm(t("Do you really want to delete your account?\n\nAll books associated with your account will be removed. This action cannot be undone. Are you sure you want to proceed?"))
    if (userConfirmation) {
      await deleteUser({ id })
      await sendLogout()
    }
  }

  const handleUsernameChange = e => setUsrName(e.target.value)
  const handleAboutChange = e => setCurAbout(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)
  const handleConfirmPasswordChange = e => setConfirmPassword(e.target.value)
  const handleChangePWD = () => {
    setErrMsg('')
    setConfirmPassword('')
    setPassword('')
    setChangePWD(prev => !prev)
  }


  const handleImgInput = async e => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file)
      convertToBase64(url, base64 => {
        setAvatar(base64);
      })
    }
  }

  const handleRolesChange = e => {
    setErrMsg('')
    if (e.target.checked) {
      setCurRoles([...curRoles, e.target.value])
    } else if (!e.target.checked && curRoles.length > 1) {
      const tmp = curRoles.filter(item => item !== e.target.value)
      setCurRoles(tmp)
    } else {
      e.target.checked = true
    }
  }


  const onFormSubmit = async e => {
    e.preventDefault()
    try {

      const user = {
        username: usrName,
        about: curAbout,
        avatar: curAvatar,
        roles: curRoles,
        id
      }

      if (usrName.length === 0) {
        throw new Error(t("Username is missing!"))
      }

      if (changePwd) {
        if (password !== confirmPassword) {
          throw new Error(t("Password doesn't match!"))
        }
        user.password = password
      }

      await updateUser(user)
    } catch (err) {
      setErrMsg(err.message)
    }
  }


  const avatarInput = (
    <div className="avatar-wrapper">
      <label key="avatar label" htmlFor="avatar" className="avatar" data-icon="&#x270E;">
        <img src={curAvatar} width="200" />
      </label>
      <input
        key="avatar input"
        type="file"
        id="avatar"
        name="avatar"
        onChange={handleImgInput}
        accept="image/*"
      />
    </div>
  )

  const usernameInput = [
    <label data-icon="&#x270E;" key="username label">
      <Trans>Username</Trans>
    </label>,
    <input
      key="username input"
      onChange={handleUsernameChange}
      value={usrName}
    />
  ]


  const aboutInput = [
    <label data-icon="&#x270E;" key="about lable">
      <Trans>About</Trans>
    </label>,
    <textarea
      className="about-textarea"
      maxLength="100"
      onChange={handleAboutChange}
      key="about input"
      value={curAbout}
    />
  ]

  const rolesInput = [
    <label data-icon="&#x270E;" key="roles label">
      <Trans>Roles</Trans>
    </label>,
    <fieldset className="role-fields" key="roles Filedset" ref={rolesRef} onChange={handleRolesChange}>
      <input
        type="checkbox"
        name="role"
        id="Customer"
        value="Customer"
      />
      <label htmlFor="Customer">
        <Trans>Customer</Trans>
      </label>

      <input
        type="checkbox"
        value="Admin"
        name="Admin"
        id="Admin"
      />
      <label htmlFor="Admin">
        <Trans>Admin</Trans>
      </label>
    </fieldset>
  ]

  const passwordInput = [
    <label data-icon="&#x270E;" key="password label">
      <Trans>Password</Trans>
    </label>,
    <fieldset className={`password-fields password-filed-active-${changePwd}`} key="password fieldset">
      <div className="toggle" onClick={handleChangePWD}>
        <Trans>Change Password</Trans>
      </div>
      <label htmlFor="NewPwd">
        <Trans>New Password</Trans>
      </label>
      <input
        onChange={handlePasswordChange}
        value={password}
        type="password"
        id="NewPwd"
      />

      <label htmlFor="ConfPwd">
        <Trans>Confirm Password</Trans>
      </label>
      <input
        type="password"
        id="ConfPwd"
        onChange={handleConfirmPasswordChange}
        value={confirmPassword}
      />
    </fieldset>
  ]

  let form
  if (isLoading || isUserUpdateLoading || isLogoutLoading || isDeletionLoading) form = <LoadingSpinner />
  if (isSuccess) {
    form = [
      <form key="user-edit-form" onSubmit={onFormSubmit} onChange={() => setErrMsg('')}>
        {avatarInput}
        {usernameInput}
        {aboutInput}
        {isAdmin && rolesInput}
        {passwordInput}
        <div className="error">
          {errMsg}
        </div>
        <Button className="submit-button" theme="good" type="sumbit">
          <Trans>Save</Trans>
        </Button>
      </form>,
      <hr />,
      <div key="danger-zone" className="danger-zone">
        <h2>
          <Trans>!!!Danger Zone!!!</Trans>
        </h2>
        <Button theme="danger" onClick={onUserDelete}>
          <Trans>Delete Account</Trans>
        </Button>
      </div>
    ]
  }

  return (
    <Layout title={title}>
      <Section className="account-settings">
        {form}
      </Section>
    </Layout>
  )
}

export default EditAccount
