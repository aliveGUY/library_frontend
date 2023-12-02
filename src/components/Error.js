const Error = ({ error }) => {

  return (
    <p className="error">Error: {error?.data?.message || error?.error}</p>
  )
}

export default Error