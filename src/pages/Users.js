import LoadingSpinner from "components/LoadingSpinner"
import { useGetUsersQuery } from "app/api/usersApiSlice"
import Error from "components/Error"
import { useDeleteUserMutation } from "app/api/usersApiSlice"
import { useTranslation, Trans } from "react-i18next"
import Layout from "components/Layout"
import Section from "components/Section"

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
        <Section className="users-section">
          <h1>
            <Trans>All Accounts</Trans>
          </h1>
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
                const { username, roles, _id, bookStats, cartStats } = user
                const formattedRoles = roles.join(", ")
                return (
                  <tr key={idx}>
                    <th>
                      <a href={`/account/${_id}`}>{username}</a>
                    </th>
                    <th>{formattedRoles}</th>
                    <th className="additional">{cartStats}</th>
                    <th className="additional">{bookStats}</th>
                    <th className="actions">{isDeletionLoading
                      ? <LoadingSpinner />
                      : [
                        <a href={`/account/edit/${_id}`} key="edit-button" >
                          <Trans>Edit</Trans>
                        </a>,
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
        </Section>
      </Layout>
    )
  }

  return content
}

export default Users