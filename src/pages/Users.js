import LoadingSpinner from "components/LoadingSpinner"
import { useGetUsersQuery } from "app/api/usersSlice"
import Error from "components/Error"
import { useDeleteUserMutation } from "app/api/usersSlice"
import { useTranslation, Trans } from "react-i18next"
import Layout from "components/Layout"
import Button from "components/Button"

const Users = () => {
  const { t } = useTranslation()
  const title = t("Mange Users — IMBook")
  const description = t("This page is forbidden to third parties")
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  const [deleteUser, { isLoading: isDeletionLoading }] = useDeleteUserMutation()



  let content
  if (isError) content = <Error error={error} />
  if (isLoading) content = <LoadingSpinner />

  const onUserDelete = async ({ id }) => {
    await deleteUser({ id })
    console.log(id)
  }

  if (isSuccess) {
    const usersData = Object.values(users.entities)
    content = (
      <Layout title={title} description={description} className="Home">
        <h2>
          <Trans>All Accounts</Trans>
        </h2>
        <table className="usersTable" >
          <thead>
            <tr>
              <th>
                <Trans>User</Trans>
              </th>
              <th>
                <Trans>Roles</Trans>
              </th>
              <th className="additional">
                <Trans>Cart Items</Trans>
              </th>
              <th className="additional">
                <Trans>Posted Book</Trans>
              </th>
              <th>
                <Trans>Actions</Trans>
              </th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, idx) => {
              const { username, roles, _id } = user
              return (
                <tr key={idx}>
                  <th>{username}</th>
                  <th>{roles}</th>
                  <th className="additional">N/A</th>
                  <th className="additional">N/A</th>
                  <th>{isDeletionLoading
                    ? <LoadingSpinner />
                    : [
                      <Button href={`/account/settings/${_id}`} key="edit-button" >
                        <Trans>Edit</Trans>
                      </Button>,
                      <button key="delete-button" onClick={() => onUserDelete({ id: _id })} className="delete">
                        <Trans>Delete</Trans>
                      </button>
                    ]
                  }
                  </th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Layout>
    )
  }

  return content
}

export default Users