import LoadingSpinner from "../components/LoadingSpinner"
import { useGetUsersQuery } from "../app/api/usersSlice"
import Error from "../components/Error"

const Users = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  if (isError) return <Error error={error} />

  return isLoading && !isSuccess
    ? <LoadingSpinner />
    : (
      <div className="Home">
        <h2>users</h2>
      </div>
    )
}

export default Users