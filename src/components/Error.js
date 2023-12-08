import { Outlet, useNavigate } from "react-router-dom"

const redirectList = {
  "Home": "/",
  "Login": "/login"
}

const Error = ({ error, redirects }) => {
  const navigate = useNavigate()
  if (!error) return

  if (error?.status === 401) return <Outlet />

  const message = error?.data?.message ||
    error?.error ||
    error

  return (
    <div className="error-wrapper">
      <h2 className="error">Error: {message}</h2>
      {redirects && redirects.map((redirect, idx) => (
        <button key={idx} onClick={() => navigate(redirectList[redirect])}>
          {redirect}
        </button>
      ))}
    </div>
  )
}

export default Error