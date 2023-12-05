const Error = ({ error }) => {
  if(!error) return

  return (
    <p className="error">Error: {error?.data?.message || error?.error}</p>
  )
}

export default Error