import { useGetBooksByUserQuery } from "app/api/booksSlice"
import useAuth from "hooks/useAuth"
import LoadingSpinner from "components/LoadingSpinner"
import Error from "components/Error"
import Layout from '../components/Layout'
import BooksMap from "components/BooksMap"
import Section from "components/Section"
import defaultAvatar from 'images/components/default-profile.jpg'
import Button from "components/Button"
import { Trans } from "react-i18next"

const Account = () => {
  const { username, id } = useAuth()
  const title = `${username} - IMBook`

  const {
    data: books,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBooksByUserQuery({ id })

  let content
  if (isLoading) content = <LoadingSpinner />
  if (isError) content = <Error error={error} />

  if (isSuccess) {
    content = (
      <Layout title={title}>
        <Section className="profile-section">
          <div className="profile-photo">
            <img src={defaultAvatar} alt="avatar" />
          </div>
          <div className="profile-info">
            <h2>{username}</h2>
            <p>N/A</p>
            <Button theme="marengo">
              <Trans>Edit Profile</Trans>
            </Button>
          </div>
        </Section>
        <Section className="account-books-section">
          <h2 className="account-books-title">
            <Trans>Books posted by {{username}}</Trans>
          </h2>
          <BooksMap books={books} />
        </Section>
      </Layout>
    )
  }

  return content
}

export default Account