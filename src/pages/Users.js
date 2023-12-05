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

  let content
  if (isError) content = <Error error={error} />
  if (isLoading) content = <LoadingSpinner />

  if (isSuccess) {
    const usersData = Object.values(users.entities)
    console.log(usersData)
    content = (
      <div className="Home">
        <h2>users</h2>
        <table className="usersTable" >
          <thead>
            <tr>
              <th>User</th>
              <th>Roles</th>
              <th className="additional">Cart Items</th>
              <th className="additional">Posted Book</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, idx) => {
              const { username, roles } = user
              return (
                <tr>
                  <th>{username}</th>
                  <th>{roles}</th>
                  <th className="additional">N/A</th>
                  <th className="additional">N/A</th>
                  <th>
                    Edit<br />Remove
                  </th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  return content
}

export default Users