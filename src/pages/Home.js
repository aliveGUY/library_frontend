import Book from "../components/Book"
import { useGetBooksQuery } from "../app/api/booksSlice"
import LoadingSpinner from "../components/LoadingSpinner"
import Error from "../components/Error"

const Home = () => {
  const {
    data: books,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBooksQuery()

  let content

  if (isError) content = <Error error={error} />
  if (isLoading) content = <LoadingSpinner />

  if (isSuccess) {
    content = (
      <div className="Home">
        <div className="books">
          {Object.values(books.entities).map((book, index) => <Book book={book} key={index} />)}
        </div>
      </div>
    )
  }

  return content
}

export default Home