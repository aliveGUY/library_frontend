import { useGetBooksByUserQuery } from "app/api/booksSlice"
import useAuth from "hooks/useAuth"
import LoadingSpinner from "components/LoadingSpinner"
import Error from "components/Error"
import Layout from '../components/Layout'
import BooksMap from "components/BooksMap"
import Section from "components/Section"
import defaultAvatar from 'images/components/default-profile.jpg'
import Button from "components/Button"

const Account = () => {
  const { username, id, status } = useAuth()
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
            <img src={defaultAvatar} />
          </div>
          <div className="profile-info">
            <h2>{username}</h2>
            <p>N/A</p>
            <Button theme="marengo">Edit Profile</Button>
          </div>
        </Section>
        <Section className="account-books-section">
          <h2 className="account-books-title">Books posted by {username}:</h2>
          <BooksMap books={books} />
        </Section>
      </Layout>
    )
  }

  return content
}

export default Account