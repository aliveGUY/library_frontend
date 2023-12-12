import { useGetBooksByUserQuery } from "app/api/booksApiSlice"
import useAuth from "hooks/useAuth"
import LoadingSpinner from "components/LoadingSpinner"
import Layout from '../components/Layout'
import BooksMap from "components/BooksMap"
import Section from "components/Section"
import Button from "components/Button"
import { Trans } from "react-i18next"
import { useLocation } from "react-router-dom"
import { useGetUserByIdQuery } from "app/api/usersApiSlice"

const Account = () => {
  const { pathname } = useLocation()
  const regex = /\/account\/([a-fA-F0-9]+)/

  const queryIndex = pathname.match(regex)[1]
  const { id: authIndex, roles } = useAuth()
  const isPermitted = authIndex === queryIndex || roles.includes("Admin")

  const {
    data: user,
    isLoading,
    isSuccess,
  } = useGetUserByIdQuery({ id: queryIndex })

  const {
    data: books,
    isLoading: isBookListLoading,
    isSuccess: isBookListSuccess,
    isError: isBookListError,
    error: bookListError
  } = useGetBooksByUserQuery({ id: queryIndex })

  const editButton = (
    <Button theme="marengo" href={`/account/edit/${authIndex}`}>
      <Trans>Edit</Trans>
    </Button>
  )

  let userInfo
  if (isLoading) userInfo = <LoadingSpinner />
  if (isSuccess) {
    userInfo = [
      <div key="avatar" className="profile-photo">
        <img src={user.avatar} alt="avatar" />
      </div>,
      <div key="profile-info" className="profile-info">
        <h2>{user.username}</h2>
        <p>{user.about}</p>
        {isPermitted && editButton}
      </div>
    ]
  }

  let booksList
  if (isBookListLoading) booksList = <LoadingSpinner />
  if (isBookListSuccess) booksList = <BooksMap books={books} />
  if (isBookListError && (bookListError.status === 404 || bookListError.status === 401)) {
    booksList = (
      <div className="no-books-found">
        <h3>
          <Trans>No books were found</Trans>
        </h3>
        {isPermitted && (
          <Button theme="grullo" href="/book/new">
            <Trans>Create Your First Book</Trans>
          </Button>
        )}
      </div>
    )
  } else if (isBookListError) {
    booksList = <div>{bookListError.data.error}</div>
  }

  const title = `Account - IMBook`
  return (
    <Layout title={title}>
      <Section className="profile-section">
        {userInfo}
      </Section>
      <Section className="account-books-section">
        <h2 className="account-books-title">
          <Trans>Books posted by {{ username: user?.username }}</Trans>
        </h2>
        {booksList}
      </Section>
    </Layout>
  )
}

export default Account