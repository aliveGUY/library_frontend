import { useGetBooksByUserQuery } from "../app/api/booksSlice"
import useAuth from "../hooks/useAuth"
import LoadingSpinner from "../components/LoadingSpinner"
import Error from "../components/Error"
import Book from "../components/Book"

const Account = () => {
  const { username, id, status } = useAuth()

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
      <div>
        <h2>Account Info:</h2>
        <ul>
          <li>username: {username}</li>
          <li>status: {status}</li>
        </ul>

        <h2>Books posted by {username}:</h2>
        <div className="Home">
          <div className="books">
            {Object.values(books.entities).map((book, index) => <Book book={book} key={index} />)}
          </div>
        </div>
      </div>
    )
  }

  return content
}

export default Account