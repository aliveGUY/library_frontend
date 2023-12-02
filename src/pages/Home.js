import Book from "../components/Book"
import BookForm from "../components/BookForm"
import { useGetBooksQuery } from "../app/api/booksSlice"
import LoadingSpinner from "../components/LoadingSpinner"
import Error from "../components/Error"
import { useEffect } from "react"

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
          {books.ids.map(book => <Book bookId={book} key={book} />)}
        </div>
        <BookForm />
      </div>
    )
  }

  return content
}

export default Home